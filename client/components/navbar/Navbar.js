import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Interceptor from "../../axios/interceptors";
import {
  decreaseQuantity,
  increaseQuantity,
  removeItem,
} from "../../redux/slice/cartSlice";
import { updateLoginStatus } from "../../redux/slice/logedinSlice";
import { cartUpdate, menuUpdate } from "../../redux/slice/menuSlice";
import { removeProductId } from "../../redux/slice/productIdSlice";
import CartItem from "../cart/CartItem";
import Theme from "../theme/theme";

export default function Navbar() {
  const router = useRouter();
  const menuOpen = useSelector((state) => state.menu.menuOpen);
  const cartOpen = useSelector((state) => state.menu.cartOpen);
  const cartItem = useSelector((state) => state.cart.cartItem);

  const isLogedin = useSelector((state) => state.logedin.isLogedin);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [isLogedin]);

  const handleMenuOpen = () => {
    dispatch(menuUpdate(true));
    dispatch(cartUpdate(false));
  };
  const handleMenuClose = () => {
    dispatch(menuUpdate(false));
    dispatch(cartUpdate(false));
  };

  const handleCart = () => {
    dispatch(cartUpdate(true));
    dispatch(menuUpdate(false));
  };
  const handleCartClose = () => {
    dispatch(cartUpdate(false));
    dispatch(menuUpdate(false));
  };

  const handleRemoveItem = (id) => {
    dispatch(removeProductId(id));
    dispatch(removeItem(id));
  };

  const increase = (id) => {
    dispatch(increaseQuantity(id));
  };

  const decrease = (id) => {
    dispatch(decreaseQuantity(id));
  };

  const cartTotal = cartItem.reduce((prev, item) => {
    return prev + item.sale_price * item.quantity;
  }, 0);

  const cartTotalLength = cartItem.reduce((prev, item) => {
    return prev + item.quantity;
  }, 0);

  const logout = async () => {
    try {
      const refresh_token = localStorage.getItem("refresh_token");
      if (refresh_token) {
        const res = await Interceptor.post("/api/v1/auth/logout", {
          refresh_token,
        });
        localStorage.removeItem("acces_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("cartItem");
        Cookies.remove("info");
        dispatch(updateLoginStatus(false));
        router.replace("/login");
      }
    } catch (error) {
      localStorage.removeItem("acces_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("cartItem");
      Cookies.remove("info");
      dispatch(updateLoginStatus(false));
      router.replace("/login");
    }
  };
  const handleChackout = () => {
    cartTotalLength <= 0 && alert("cart is empty!");
    cartTotalLength > 0 && handleCartClose();
    cartTotalLength > 0 && handleMenuClose();
    cartTotalLength > 0 && router.push("/chackout");
  };

  if (isLoading) {
    return;
  }

  return (
    <div className=" z-50 w-full fixed top-0 left-0">
      <div className="w-full relative on-light py-3 dark:on-dark-navbar">
        <div className=" mx-4 flex justify-between items-center flex-wrap">
          <div className=" lg:hidden z-50">
            {!menuOpen && (
              <button
                onClick={handleMenuOpen}
                className=" border-none outline-none p-1 rounded-md"
              >
                <div className=" w-7 text-4xl space-x-0">
                  <div className=" w-7 h-1 my-1 bg-zinc-300"></div>
                  <div className=" w-7 h-1 my-1 bg-zinc-300"></div>
                  <div className=" w-7 h-1 my-1 bg-zinc-300"></div>
                </div>
              </button>
            )}
            {menuOpen && (
              <button
                onClick={handleMenuClose}
                className=" transform translate-y-1 border-none outline-none p-1 mt-1 rounded-md z-50"
              >
                <div className=" rotate-45 -translate-y-1 -translate-x-1 w-7 h-1 my-1 bg-zinc-300"></div>
                <div className=" -rotate-45 -translate-y-3 -translate-x-1 w-7 h-1 my-1 bg-zinc-300"></div>
              </button>
            )}
          </div>
          <div className=" cursor-pointer font-bold text-xl z-50">
            <h1 className="text-zinc-300">E-commerch</h1>
          </div>
          <div>
            <ul
              className={`w-full absolute top-0 left-0 sm:absolute sm:top-0 sm:-left-96 sm:w-64 sm:h-screen lg:static lg:w-full lg:h-auto lg:pt-0 lg:flex lg:items-center ${
                menuOpen ? "sm:left-0 " : " -top-96  "
              }  pt-24 z-10 on-light dark:on-dark-navbar`}
            >
              <li>
                <Link href="/">
                  <a
                    onClick={handleMenuClose}
                    className={`${
                      router.pathname === "/" ? " text-green-500" : ""
                    } uppercase text-center block py-2 hover:text-white hover:bg-gray-700 dark:hover:bg-slate-700 lg:mx-5 lg:rounded-md lg:p-2`}
                  >
                    HOME
                  </a>
                </Link>
              </li>

              {!isLogedin && (
                <li>
                  <Link href="/signup">
                    <a
                      onClick={handleMenuClose}
                      className={`${
                        router.pathname === "/signup" ? " text-green-500" : ""
                      } uppercase text-center block py-2 hover:text-white hover:bg-gray-700 dark:hover:bg-slate-700 lg:mx-5 lg:rounded-md lg:p-2`}
                    >
                      SIGNUP
                    </a>
                  </Link>
                </li>
              )}
              {!isLogedin && (
                <li>
                  <Link href="/login">
                    <a
                      onClick={handleMenuClose}
                      className={`${
                        router.pathname === "/login" ? " text-green-500" : ""
                      } uppercase text-center block py-2 hover:text-white hover:bg-gray-700 dark:hover:bg-slate-700 lg:mx-5 lg:rounded-md lg:p-2`}
                    >
                      LOGIN
                    </a>
                  </Link>
                </li>
              )}
              {isLogedin && (
                <li>
                  <div className=" w-full text-center py-1">
                    <button
                      type="button"
                      onClick={() => {
                        handleMenuClose();
                        logout();
                      }}
                      className=" outline-none uppercase  py-2 hover:text-white hover:bg-gray-700 dark:hover:bg-slate-700 lg:mx-5 lg:rounded-md lg:p-2 rounded-md p-1"
                    >
                      LOG OUT
                    </button>
                  </div>
                </li>
              )}
            </ul>
          </div>
          <div className=" z-50 flex items-center">
            <div className={`${isLogedin ? "block" : "hidden"} mx-2`}>
              <Link href="/users/profile">
                <a className=" outline-none border-none">
                  <img
                    className=" w-8 h-8"
                    src={`${process.env.NEXT_PUBLIC_DOMEIN}/icon/user.png`}
                  />
                </a>
              </Link>
            </div>
            <div className="mr-2 relative">
              <button
                onClick={handleCart}
                className=" select-none block border-none outline-none p-1"
              >
                <img
                  className=" w-8 h-8"
                  src={`${process.env.NEXT_PUBLIC_DOMEIN}/icon/bag-icon.png`}
                />
              </button>
              <span className=" select-none no-scrollbar text-center absolute -top-1 -right-1 w-6 h-6 overflow-auto bg-red-700 text-white rounded-full">
                {cartTotalLength}
              </span>
            </div>

            <div
              className={` ${
                cartOpen ? "block" : "hidden"
              } w-full sm:max-w-lg md:max-w-lg lg:max-w-xl h-screen fixed top-16 right-0 on-light dark:bg-slate-900 shadow-md`}
            >
              <div className=" text-right">
                <button
                  onClick={handleCartClose}
                  className=" transform translate-y-1 border-none outline-none py-1 px-1 m-2 rounded-md z-50"
                >
                  <div className=" rotate-45 -translate-y-1 -translate-x-1 w-7 h-1 my-1 bg-red-500"></div>
                  <div className=" -rotate-45 -translate-y-3 -translate-x-1 w-7 h-1 my-1 bg-red-500"></div>
                </button>
              </div>
              <div className="w-full h-[90vh] overflow-scroll">
                {cartItem.length <= 0 && (
                  <p className=" text-center py-1">cart empty</p>
                )}
                {cartItem &&
                  cartItem.map((item) => (
                    <CartItem
                      key={item._id}
                      item={item}
                      handleRemoveItem={handleRemoveItem}
                      increaseQuantity={increase}
                      decreaseQuantity={decrease}
                    />
                  ))}

                <div className=" my-12">
                  <div className=" mx-4 py-2 flex justify-between items-center">
                    <p className=" text-2xl">Total : </p>
                    <p className=" text-2xl text-orange-300">$ {cartTotal}</p>
                  </div>
                  <div className=" my-2 text-center">
                    <button
                      onClick={handleChackout}
                      className=" capitalize  w-28 py-2 bg-indigo-600 rounded-md "
                      type="button"
                    >
                      checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <Theme />
          </div>
        </div>
      </div>
    </div>
  );
}
