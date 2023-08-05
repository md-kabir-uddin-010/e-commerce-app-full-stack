import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../redux/slice/themeSlice";

export default function DashboardTheme() {
  const [mounted, setMounted] = useState(false);

  const currentTheme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  const handleDark = () => {
    dispatch(setTheme("dark"));
    localStorage.setItem("theme", "dark");
  };

  const handleLight = () => {
    dispatch(setTheme("light"));
    localStorage.setItem("theme", "light");
  };
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="">
      <button
        className={`${
          currentTheme === "light"
            ? " mx-1 py-1 px-2 outline-none bg-indigo-400 text-white rounded-md"
            : " mx-1 py-1 px-2 outline-none hover:bg-slate-600 hover:text-white rounded-md"
        }`}
        onClick={handleLight}
      >
        Light
      </button>
      <button
        className={`${
          currentTheme === "dark"
            ? " mx-1 py-1 px-2 outline-none bg-indigo-400 text-white rounded-md"
            : " mx-1 py-1 px-2 outline-none hover:bg-slate-400 hover:text-white rounded-md"
        }`}
        onClick={handleDark}
      >
        Dark
      </button>
    </div>
  );
}
