import { configureStore } from "@reduxjs/toolkit";
import configurationSlice from "./slices/configuration";
import moviesSlice from "./slices/movies";

const store = configureStore({
  reducer: {
    configuration: configurationSlice.reducer,
    movies: moviesSlice.reducer,
  },
});

export default store;
