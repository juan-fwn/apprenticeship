import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
};

const homeScreenSlice = createSlice({
  name: "homeScreen",
  initialState,
  reducers: {
    setMovies(state, action) {
      state.movies = [...action.payload];
    },
  },
});

export const homeScreenActions = homeScreenSlice.actions;

export default homeScreenSlice;
