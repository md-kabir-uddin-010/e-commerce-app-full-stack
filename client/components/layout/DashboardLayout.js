import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../redux/slice/themeSlice";
import Navbar from "../dashboard/Navbar";
import Sidebar from "../dashboard/Sidebar";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  useEffect(() => {
    const getTheme = localStorage.getItem("theme");
    getTheme && dispatch(setTheme(getTheme));
  }, []);

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className=" relative flex  min-h-screen dark:on-dark">
        <div
          className={`z-10 overflow-auto w-3/4 h-full fixed ${
            !sidebarOpen ? " -left-3/4 h-screen" : "left-0"
          } top-0 sm:w-72 md:static  md:h-screen  shadow-lg border bg-white dark:on-dark dark:border-gray-700`}
        >
          <div className=" relative md:hidden">
            <div className=" absolute top-0 right-0  text-right">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className=" ml-2 mt-5"
              >
                <div className=" rotate-45 -translate-y-1 -translate-x-1 w-7 h-1 my-1 bg-black dark:bg-zinc-300"></div>
                <div className=" -rotate-45 -translate-y-3 -translate-x-1 w-7 h-1 my-1 bg-black dark:bg-zinc-300"></div>
              </button>
            </div>
          </div>
          <div className="">
            <Sidebar />
          </div>
        </div>
        {/* change width to w-full */}
        <div className=" w-full overflow-x-auto bg-white dark:on-dark">
          <div className=" flex  border-b dark:border-gray-600">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className=" m-2 md:hidden"
            >
              <div className=" w-7 ">
                <div className=" w-7 h-1 my-1 bg-black dark:bg-zinc-300"></div>
                <div className=" w-7 h-1 my-1 bg-black dark:bg-zinc-300"></div>
                <div className=" w-7 h-1 my-1 bg-black dark:bg-zinc-300"></div>
              </div>
            </button>

            <div className="w-full py-1 ml-4 my-2">
              <Navbar />
            </div>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
