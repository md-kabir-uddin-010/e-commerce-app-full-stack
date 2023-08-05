import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../redux/slice/themeSlice";

export default function Theme() {
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
    <div>
      {currentTheme === "dark" && (
        <button
          className=" dark:hover:text-orange-400 dark:text-white border-none outline-none"
          onClick={handleLight}
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </button>
      )}
      {currentTheme === "light" && (
        <button
          className=" hover:text-orange-400 border-none outline-none"
          onClick={handleDark}
        >
          <svg
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            id="moon"
            className="w-8 h-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            ></path>
          </svg>
        </button>
      )}
    </div>
  );
}
