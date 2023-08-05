import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import adminInterceptor from "../../axios/adminInterceptor";
import sidebarData from "../../data/sidebar-data";
import DashboardTheme from "../theme/DashboardTheme";

export default function Sidebar() {
  const router = useRouter();
  const [data, setData] = useState(sidebarData);

  const logoutAdmin = async () => {
    try {
      const refresh_token = localStorage.getItem("admin_refresh_token");
      if (refresh_token) {
        const res = await adminInterceptor.post("/api/v1/auth/logout", {
          refresh_token,
        });
        localStorage.removeItem("admin_acces_token");
        localStorage.removeItem("admin_refresh_token");
        localStorage.removeItem("cartItem");
        Cookies.remove("info");
        router.replace("/admin/dashboard/login");
      }
    } catch (error) {
      localStorage.removeItem("admin_acces_token");
      localStorage.removeItem("admin_refresh_token");
      localStorage.removeItem("cartItem");
      Cookies.remove("info");
      router.replace("/admin/dashboard/login");
    }
  };

  return (
    <div>
      <header>
        <h1 className=" py-4 text-center font-bold text-2xl border-b dark:border-gray-500">
          E-commerch
        </h1>
      </header>
      <div className=" ml-3 my-4">
        {data.map((items) => {
          return (
            <ul className=" p-1" key={items.id}>
              <h2 className=" capitalize font-semibold text-lg">
                {items.header}
              </h2>
              {items.links.map((link) => {
                return (
                  <li key={link.id} className="">
                    <Link href={link.link}>
                      <a
                        className={`${
                          router.pathname === link.link
                            ? " w-full pl-5 block capitalize  text-green-500 hover:text-white text-lg hover:bg-slate-400 rounded-md"
                            : " w-full pl-5 block capitalize  text-lg hover:bg-slate-400 hover:text-white rounded-md"
                        }`}
                      >
                        {link.title}
                      </a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          );
        })}
        <div>
          <button
            onClick={logoutAdmin}
            type="button"
            className=" rounded-md ml-2 px-4 py-1 text-lg hover:bg-indigo-500 hover:text-white"
          >
            Logout
          </button>
        </div>
      </div>
      <hr className=" dark:border-gray-500" />
      <div className=" mt-4 ml-4">
        <DashboardTheme />
      </div>
    </div>
  );
}
