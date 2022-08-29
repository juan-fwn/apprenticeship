import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  genreList: [],
  movieList: [],
  similarMovies: [],
  movieCrew: [],
  movieCast: [],
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
    setMovieCredits(state, action) {
      state.movieCrew = action.payload.crew;
      state.movieCast = action.payload.cast;
    },
  },
});

export const selectors = {
  getGenres: (state) => state.movies.genreList,
  getMovies: (state) => state.movies.movieList,
  getSimilarMovies: (state) => state.movies.similarMovies,
  getMovieCrew: (state) => state.movies.movieCrew,
  getMovieCast: (state) => state.movies.movieCast,
};

export const moviesActions = moviesSlice.actions;

export default moviesSlice;
