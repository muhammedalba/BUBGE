import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "CartSlice",
  initialState: [ ],
  reducers: {
    cartitems: (state, action) => {
      console.log(action.payload,"action");
      console.log(action,"state2");
      console.log(state,"state1");
      return [...state,action.payload];
    },
  },
});
export const { cartitems } = CartSlice.actions;
export default CartSlice.reducer;
