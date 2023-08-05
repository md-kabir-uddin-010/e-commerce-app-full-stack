import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../slice/cartSlice";
import logedinSlice from "../slice/logedinSlice";
import menuSlice from "../slice/menuSlice";
import productIdSlice from "../slice/productIdSlice";
import themeSlice from "../slice/themeSlice";

const store = configureStore({
  reducer: {
    menu: menuSlice,
    theme: themeSlice,
    logedin: logedinSlice,
    cart: cartSlice,
    ids: productIdSlice,
  },
});

export default store;
