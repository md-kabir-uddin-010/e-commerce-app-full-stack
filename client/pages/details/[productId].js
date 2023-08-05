import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { instance } from "../../axios/interceptors";
import { addToCart } from "../../redux/slice/cartSlice";
import { addProductId } from "../../redux/slice/productIdSlice";

export default function Details() {
  const [product, setProduct] = useState({});
  const [data, setData] = useState([]);
  const [featuredImage, setFeaturedImage] = useState("");
  const [selectedSizes, setSelectedSizes] = useState("");

  const router = useRouter();
  const dispatch = useDispatch();
  const { productId } = router.query;

  const productIds = useSelector((state) => state.ids.productId);
  const getProducts = async () => {
    try {
      const { data } = await instance.get("/api/v1/public/all/products");
      setData(data.info);
    } catch (error) {
      setData([]);
    }
  };
  const handleCart = (id) => {
    selectedSizes && dispatch(addProductId(id));
    !selectedSizes && alert("Avilable sizes is required!");

    selectedSizes &&
      data &&
      data.find((product) => {
        if (product._id === id) {
          dispatch(
            addToCart({ ...product, selected_size: selectedSizes, quantity: 1 })
          );
        }
      });
  };

  const getProduct = async (id) => {
    try {
      const { data } = await instance.get(`/api/v1/public/product/${id}`);
      setProduct(data.info);
    } catch (error) {
      setProduct({});
    }
  };
  useEffect(() => {
    getProducts();
    productId && getProduct(productId);
  }, []);
  const handeleChange = (e) => {
    setSelectedSizes(e.target.value);
  };

  return (
    <div className=" w-full h-screen dark:on-dark">
      <div className=" w-full sm:w-[600px] md:w-[600px] lg:w-[1086px] mx-auto lg:flex pt-4 lg:pt-10">
        <div className=" flex-1 sm:flex items-center">
          <div className=" flex sm:block">
            {product &&
              product.images?.map((image) => {
                return (
                  <div key={image._id}>
                    <img
                      onClick={() => setFeaturedImage(image.url)}
                      src={`${process.env.NEXT_PUBLIC_BASE_URL}/products/${image.url}`}
                      alt="no image found"
                      className={`${
                        featuredImage === image.url
                          ? "cursor-pointer  opacity-40  w-24 h-24 my-2 mx-2"
                          : " cursor-pointer  w-24 h-24 my-2 mx-2"
                      }`}
                    />
                  </div>
                );
              })}
          </div>
          <div className="">
            {product &&
              product.images?.map((image) => {
                if (image.featured) {
                  return (
                    <div key={image._id} className="">
                      <img
                        src={
                          featuredImage
                            ? ` ${process.env.NEXT_PUBLIC_BASE_URL}/products/${featuredImage}`
                            : ` ${process.env.NEXT_PUBLIC_BASE_URL}/products/${image.url}`
                        }
                        alt="no image found"
                        className=" w-96 h-96"
                      />
                    </div>
                  );
                }
              })}
          </div>
        </div>
        <div className=" flex-1 mx-2">
          <p className=" capitalize my-2">{product?.title}</p>
          <p className="">{product?.description}</p>
          <p className=" capitalize my-2">
            <span className=" mr-2 font-bold">price :</span>{" "}
            {product?.sale_price}
            {product?.currency_format}
          </p>
          <p className=" capitalize my-2">
            <span className=" mr-2 line-through font-bold">
              {" "}
              reguler price :
            </span>
            {product?.reguler_price} {product?.currency_format}
          </p>

          {product?.free_shiping && (
            <p className=" w-52 my-2 text-center py-1 px-2 capitalize  bg-indigo-600 text-white">
              {product?.free_shiping ? "shiping free" : ""}
            </p>
          )}
          <div className=" capitalize my-2">
            <span className=" capitalize mr-2 font-semibold">
              avilable sizes :
            </span>
            <select
              className=" cursor-pointer py-1 px-2 capitalize w-52 outline-none border rounded-md dark:border-gray-500 dark:bg-transparent"
              name="avilable_sizes"
              id="avilable_sizes"
              value={selectedSizes}
              onChange={handeleChange}
            >
              <option
                className="capitalize p-1 dark:text-black"
                disabled
                value={""}
                onChange={handeleChange}
              >
                select size
              </option>
              {product?.avilable_sizes?.map((size, i) => (
                <option
                  key={i}
                  className="capitalize p-1 dark:text-black"
                  value={size}
                >
                  {size}
                </option>
              ))}
            </select>
            {!selectedSizes && !productIds?.includes(product._id) && (
              <p className=" capitalize text-red-500">
                avilable sizes is required!
              </p>
            )}
          </div>
          <div className=" text-center">
            <button
              onClick={() => handleCart(product._id)}
              type="button"
              className=" capitalize w-1/2 py-2 bg-black text-white hover:bg-yellow-500 dark:bg-yellow-600 dark:hover:bg-yellow-500"
            >
              {productIds?.includes(product._id) ? "added" : "add to card"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
