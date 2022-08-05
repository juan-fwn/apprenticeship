import { configureStore } from "@reduxjs/toolkit";
import configurationSlice from "./slices/configuration";
import homeScreenSlice from "./slices/homeScreen";

const store = configureStore({
  reducer: {
    configuration: configurationSlice.reducer,
    homeScreen: homeScreenSlice.reducer,
  },
});

export default store;
