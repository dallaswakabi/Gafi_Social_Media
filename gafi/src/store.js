import { configureStore } from "@reduxjs/toolkit";
//import {setupListeners} from "@reduxjs/toolkit/dist/query"
import { AuthApi } from "./Redux/AuthApiSlice/AuthApi";
import AuthReducer from "./Redux/AuthReducer/AuthReducer";
import { postApi } from "./Redux/AuthApiSlice/PostSlice";
import PostReducer from "./Redux/AuthReducer/PostReducer"
import { ChatApi } from "./Redux/AuthApiSlice/ChatApi";

export const store = configureStore({
  reducer: {
    [AuthApi.reducerPath]: AuthApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [ChatApi.reducerPath]: ChatApi.reducer,
    Auth: AuthReducer,
    Post:PostReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(AuthApi.middleware, postApi.middleware,ChatApi.middleware),
  devTools: true,
});

//setupListeners(store.dispatch)
