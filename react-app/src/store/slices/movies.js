import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  genreList: [],
  favoriteMovies: [],
  alreadySawTrailers: [],
  popularMovies: [],
  topRatedMovies: [],
  recommendedMovies: [],
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
    setPopularMovies(state, action) {
      state.popularMovies = action.payload;
    },
    setTopRatedMovies(state, action) {
      state.topRatedMovies = action.payload;
    },
    setRecommendedMovies(state, action) {
      state.recommendedMovies = action.payload;
    },
    setSimilarMovies(state, action) {
      state.similarMovies = action.payload;
    },
    setMovieCredits(state, action) {
      state.movieCrew = action.payload.crew;
      state.movieCast = action.payload.cast;
    },
    setFavoriteMovie(state, action) {
      state.favoriteMovies = action.payload;
    },
    setAlreadySawTrailers(state, action) {
      state.alreadySawTrailers = action.payload;
    },
  },
});

export const selectors = {
  getGenres: (state) => state.movies.genreList,
  getPopularMovies: (state) => state.movies.popularMovies,
  getTopRatedMovies: (state) => state.movies.topRatedMovies,
  getRecommendedMovies: (state) => state.movies.recommendedMovies,
  getSimilarMovies: (state) => state.movies.similarMovies,
  getMovieCrew: (state) => state.movies.movieCrew,
  getMovieCast: (state) => state.movies.movieCast,
  getFavoriteMovies: (state) => state.movies.favoriteMovies,
  getAlreadySawTrailers: (state) => state.movies.alreadySawTrailers,
};

export const moviesActions = moviesSlice.actions;

export default moviesSlice;
