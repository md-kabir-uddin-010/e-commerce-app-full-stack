import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "../../redux/slice/themeSlice";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";

export default function Layout({ children }) {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  useEffect(() => {
    const getTheme = localStorage.getItem("theme");
    getTheme && dispatch(setTheme(getTheme));
  }, []);
  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="  mb-16">
        <Navbar />
      </div>
      <div>{children}</div>
      <Footer />
    </div>
  );
}
