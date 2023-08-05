import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { instance } from "../axios/interceptors";
import OrderBy from "../components/home/OrderBy";
import Products from "../components/home/Products";
import Sizes from "../components/home/Sizes";
import Loading from "../components/loading/Loading";
import { loadCartItemToLocalstorege } from "../redux/slice/cartSlice";
import { updateLoginStatus } from "../redux/slice/logedinSlice";
import { cartUpdate, menuUpdate } from "../redux/slice/menuSlice";
import { loadProductIdToLocalstorege } from "../redux/slice/productIdSlice";

export default function Home() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [selecteOrderBy, setSelecteOrderBy] = useState("");
  const [selectedSize, setSelectedSize] = useState([]);
  const [data, setData] = useState([]);

  let products;

  const getProducts = async () => {
    try {
      const { data } = await instance.get("/api/v1/public/all/products");
      setData(data.info);
    } catch (error) {
      setData([]);
    }
  };

  useEffect(() => {
    const isLogedin = localStorage.getItem("refresh_token");
    isLogedin && dispatch(updateLoginStatus(true));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cartItem"));
    const productsId = JSON.parse(localStorage.getItem("productId"));

    getProducts();
    cartItems && dispatch(loadCartItemToLocalstorege(cartItems));
    productsId && dispatch(loadProductIdToLocalstorege(productsId));
  }, []);

  const handleNabar = () => {
    dispatch(menuUpdate(false));
    dispatch(cartUpdate(false));
  };

  const handleProductByOrder = (order, product, sizes) => {
    let sortedProduct = [...product];
    if (sizes.length > 0) {
      sortedProduct = sortedProduct.filter((product) => {
        for (const size of sizes) {
          if (product.avilable_sizes.includes(size)) {
            return true;
          }
        }
      });
    }
    if (order === "lowest") {
      sortedProduct = sortedProduct.sort((a, b) => a.sale_price - b.sale_price);
    }
    if (order === "highest") {
      sortedProduct = sortedProduct.sort((a, b) => b.sale_price - a.sale_price);
    }
    return sortedProduct;
  };
  products = handleProductByOrder(selecteOrderBy, data, selectedSize);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div
      onClick={handleNabar}
      className="w-full pt-4 min-h-screen dark:on-dark"
    >
      <div className=" grid grid-cols-12 ">
        <div className=" col-span-full lg:col-span-2 text-center">
          <Sizes
            data={data}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
          />
        </div>
        <div className=" col-span-full lg:col-span-10">
          <div className=" text-center md:flex md:items-center md:justify-between md:mx-11">
            <div className=""> ({data?.length}) Products found</div>
            <div className="">
              <OrderBy
                setSelecteOrderBy={setSelecteOrderBy}
                selecteOrderBy={selecteOrderBy}
              />
            </div>
          </div>
          <div className=" w-full ">
            <Products data={products} />
          </div>
        </div>
      </div>
    </div>
  );
}
