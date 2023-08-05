import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCartItemToLocalstorege } from "../../redux/slice/cartSlice";
import { loadProductIdToLocalstorege } from "../../redux/slice/productIdSlice";

export default function Chackout() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart.cartItem);

  const cartTotal = cartItem.reduce((prev, item) => {
    return prev + item.sale_price * item.quantity;
  }, 0);

  useEffect(() => {
    const token = localStorage.getItem("refresh_token");
    if (!token) {
      router.push("/login");
      return;
    }
    setLoading(true);
  }, []);

  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem("cartItem"));
    const productsId = JSON.parse(localStorage.getItem("productId"));
    cartItems?.length === 0 && router.push("/");
    cartItems && dispatch(loadCartItemToLocalstorege(cartItems));
    productsId && dispatch(loadProductIdToLocalstorege(productsId));
    setLoading(false);
  }, []);
  const handleOrder = async () => {
    try {
      // let postData = {
      //   name: "sk kabir islam",
      // };
      // const { data } = await Interceptor.post("/api/v1/pay", postData, {
      //   withCredentials: true,
      // });
      // window.location = data.forwardLink;
      // console.log(data);
      router.push("/chackout/address");
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <p>loading...</p>;
  }
  return (
    <div className=" w-full h-screen dark:on-dark pt-4">
      {cartItem &&
        cartItem.map((item) => (
          <div
            className=" w-full sm:w-[600px] mx-auto my-2 py-2 px-4 md:py-4 lg:pt-8 dark:bg-slate-700 shadow-md rounded-lg"
            key={item._id}
          >
            <div className=" flex justify-between items-center">
              <div className="">
                <div className=" flex items-center">
                  {item?.images?.map((img) => {
                    if (img.featured) {
                      return (
                        <img
                          key={img._id}
                          className=" bg-green-600 bg-cover rounded-sm mx-2 w-36 h-36"
                          src={`${process.env.NEXT_PUBLIC_BASE_URL}/products/${img.url}`}
                          alt={"no image found"}
                        />
                      );
                    }
                  })}
                  <div className=" ml-2">
                    <p className=" ">{item.title}</p>
                    <div className=" ">
                      <span className=" mr-1">size : {item.selected_size}</span>
                    </div>
                    <p className=" ">quantity : {item.quantity}</p>
                  </div>
                </div>
              </div>
              <div className=" ">
                <p className=" text-orange-300">$ {item.sale_price}</p>
              </div>
            </div>
          </div>
        ))}
      <div className=" capitalize text-center">total - {cartTotal} $</div>
      <div className=" text-center">
        <button
          onClick={handleOrder}
          type="button"
          className=" capitalize bg-indigo-500 text-white my-3 py-3 px-10 rounded-md"
        >
          Place order
        </button>
      </div>
    </div>
  );
}
