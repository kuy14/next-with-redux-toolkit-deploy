import { configureStore } from "@reduxjs/toolkit";

import dataTestReducer from "./lib/slices/dataTestSlice";

export default configureStore({
  reducer: {
    users: dataTestReducer,
  },
  devTools: true,
});
