import { createSlice } from "@reduxjs/toolkit";

const logedinSlice = createSlice({
  name: "logedin",
  initialState: {
    isLogedin: false,
  },
  reducers: {
    updateLoginStatus: (state, action) => {
      state.isLogedin = action.payload;
    },
  },
});

export const { updateLoginStatus } = logedinSlice.actions;
export default logedinSlice.reducer;
