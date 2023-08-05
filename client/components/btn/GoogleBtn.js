import React from "react";
import Image from "next/image";

export default function GoogleBtn({ handleGoogleAuth, text }) {
  return (
    <div>
      <div className="max-w-lg mx-auto">
        <button
          onClick={handleGoogleAuth}
          type="button"
          className="w-full select-none outline-none flex justify-center items-center border border-gray-200 dark:border-gray-500 shadow-sm rounded-full hover:bg-gray-50 dark:hover:bg-slate-700"
        >
          <Image
            className=" select-none"
            src={"/icon/google-logo-9822.png"}
            width={50}
            height={50}
          />
          <span className=" ml-3">{text}</span>
        </button>
        <div className=" relative text-center py-6">
          <p className=" border-b"></p>
          <span className=" absolute top-0 left-auto p-1 mr-2 rounded-full bg-white text-2xl dark:on-dark">
            or
          </span>
        </div>
      </div>
    </div>
  );
}
