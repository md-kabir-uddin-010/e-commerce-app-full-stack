import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItem: [],
  },
  reducers: {
    loadCartItemToLocalstorege: (state, actions) => {
      state.cartItem = actions.payload;
    },
    addToCart: (state, action) => {
      const findItem = state.cartItem.some(
        (item) => item._id === action.payload._id
      );
      if (!findItem) {
        state.cartItem.push(action.payload);
        localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
      }
    },
    removeItem: (state, action) => {
      state.cartItem = state.cartItem.filter(
        (item) => item._id !== action.payload
      );
      localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
    },
    increaseQuantity: (state, action) => {
      state.cartItem.forEach((item) => {
        if (item._id === action.payload) {
          item.quantity += 1;
        }
      });
      localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
    },
    decreaseQuantity: (state, action) => {
      state.cartItem.forEach((item) => {
        if (item._id === action.payload) {
          item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
        }
      });
      localStorage.setItem("cartItem", JSON.stringify(state.cartItem));
    },
  },
});

export const {
  addToCart,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
  loadCartItemToLocalstorege,
} = cartSlice.actions;
export default cartSlice.reducer;
