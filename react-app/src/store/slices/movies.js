import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movieList: [],
  genreList: [],
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMovieList(state, action) {
      state.movieList = action.payload;
    },
    setGenreList(state, action) {
      state.genreList = action.payload;
    },
  },
});

export const selectors = {
  getMovies: (state) => state.movies.movieList,
  getGenres: (state) => state.movies.genreList,
};

export const moviesActions = moviesSlice.actions;

export default moviesSlice;
