import { createSlice } from "@reduxjs/toolkit";

const productIdSlice = createSlice({
  name: "productId",
  initialState: {
    productId: [],
  },
  reducers: {
    loadProductIdToLocalstorege: (state, actions) => {
      state.productId = actions.payload;
    },
    addProductId: (state, actions) => {
      const findId = state.productId.some((id) => id === actions.payload);
      !findId && state.productId.push(actions.payload);
      localStorage.setItem("productId", JSON.stringify(state.productId));
    },
    removeProductId: (state, actions) => {
      state.productId = state.productId.filter((id) => id !== actions.payload);
      localStorage.setItem("productId", JSON.stringify(state.productId));
    },
  },
});

export const { addProductId, removeProductId, loadProductIdToLocalstorege } =
  productIdSlice.actions;
export default productIdSlice.reducer;
