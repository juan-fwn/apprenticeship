import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovies(state, action) {
      state.movies = [...action.payload];
    },
  },
});

export const moviesSliceActions = moviesSlice.actions;

export default moviesSlice;
