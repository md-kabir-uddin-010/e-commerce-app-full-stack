import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    menuOpen: false,
    cartOpen: false,
  },
  reducers: {
    menuUpdate: (state, actions) => {
      state.menuOpen = actions.payload;
    },
    cartUpdate: (state, actions) => {
      state.cartOpen = actions.payload;
    },
  },
});

export const { menuUpdate, cartUpdate } = menuSlice.actions;
export default menuSlice.reducer;
