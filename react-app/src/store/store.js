import { configureStore } from "@reduxjs/toolkit";
import configurationSlice from "./slices/configuration";

const store = configureStore({
  reducer: {
    configuration: configurationSlice.reducer,
  },
});

export default store;
