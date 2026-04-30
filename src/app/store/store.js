import { configureStore } from "@reduxjs/toolkit";
import requestsReducer from "./requestsSlice.js";
import logsReducer from "./logsSlice.js";

export const store = configureStore({
  reducer: {
    requests: requestsReducer,
    logs: logsReducer,
  },
});
