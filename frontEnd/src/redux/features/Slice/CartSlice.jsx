import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "CartSlice",
  initialState: [],
  reducers: {
    cartitems: (state, action) => {
      const exists = state.find(product => product.productId === action.payload.productId) ;
     
      console.log(exists,'exists');

   if (!exists) {
 
     return [...state, action.payload];
   }

    },
  },
});

export const { cartitems } = CartSlice.actions;
export default CartSlice.reducer;
