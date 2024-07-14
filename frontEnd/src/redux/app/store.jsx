import { configureStore } from "@reduxjs/toolkit";

import { apiSlice } from "../features/api/apiSlice";
import { authSlice } from "../features/api/users/AuthSlice";
import SerchSlice from "../features/Slice/SerchSlice";

const store = configureStore({
  reducer: {
    // إضافة المخفضات (reducers) الخاصة بـ RTK Query
    [apiSlice.reducerPath]: apiSlice.reducer,

    [authSlice.reducerPath]: authSlice.reducer,

    serch: SerchSlice,
  },
  // إعداد middleware الخاص بـ RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware,authSlice.middleware),
});

// console.log(store.getState(),'store');
// const unsubscribe = store.subscribe(()=>console.log('update store',store.getState()));
// // console.log(useSelector(state=>state.userDetails),'store');

// unsubscribe()

export default store;
