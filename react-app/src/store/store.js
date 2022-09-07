import { configureStore } from "@reduxjs/toolkit";
import configurationSlice from "./slices/configuration";
import moviesSlice from "./slices/movies";
import userSlice from "./slices/user";

const store = configureStore({
  reducer: {
    configuration: configurationSlice.reducer,
    movies: moviesSlice.reducer,
    user: userSlice.reducer,
  },
});

export default store;
