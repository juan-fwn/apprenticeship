import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  genreList: [],
  movieList: [],
  similarMovies: [],
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setGenreList(state, action) {
      state.genreList = action.payload;
    },
    setMovieList(state, action) {
      state.movieList = action.payload;
    },
    setSimilarMovies(state, action) {
      state.similarMovies = action.payload;
    },
  },
});

export const selectors = {
  getGenres: (state) => state.movies.genreList,
  getMovies: (state) => state.movies.movieList,
  getSimilarMovies: (state) => state.movies.similarMovies,
};

export const moviesActions = moviesSlice.actions;

export default moviesSlice;
