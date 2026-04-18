import { configureStore } from "@reduxjs/toolkit";
import requestsReducer from "./requestsSlice.js";

export const store = configureStore({
  reducer: {
    requests: requestsReducer,
  },
});
