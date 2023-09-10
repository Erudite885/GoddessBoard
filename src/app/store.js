import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { jobApi } from "../services/jobApi";

export const store = configureStore({
  reducer: { [jobApi.reducerPath]: jobApi.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([jobApi.middleware]),
});
setupListeners(store.dispatch)