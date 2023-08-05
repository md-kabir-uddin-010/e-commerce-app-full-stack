import React from "react";

export default function Navbar() {
  return (
    <div>
      <nav className=" w-full flex items-center justify-between">
        <div className="">
          <input
            className=" py-1 px-2 outline-none bg-transparent border dark:border-gray-600 rounded-md"
            type="text"
            name="search"
            id="search"
            placeholder="Search...."
          />
        </div>
        <div className=" mr-2">
          <div className=" flex items-center">
            <p className=" mx-2">Sk kabir islam</p>
            <img
              className=" w-10 h-10"
              src={`${process.env.NEXT_PUBLIC_DOMEIN}/icon/user.png`}
              alt=""
            />
          </div>
        </div>
      </nav>
    </div>
  );
}
