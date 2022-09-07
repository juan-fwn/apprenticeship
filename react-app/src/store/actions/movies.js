import { getCookie } from "../../utils";
import { moviesActions } from "../slices/movies";
import { userActions } from "../slices/user";

export const getPopularMovies = (sendRequest) => {
  return (dispatch) => {
    const requestConfig = {
      path: "/movie/popular?",
    };

    const setPopularMovies = (json) => {
      if (json.results && json.results.length > 0) {
        dispatch(moviesActions.setPopularMovies(json.results));
      }
    };

    sendRequest(requestConfig, setPopularMovies);
  };
};

export const getTopRatedMovies = (sendRequest) => {
  return (dispatch) => {
    const requestConfig = {
      path: "/movie/top_rated?",
    };

    const setTopRatedMovies = (json) => {
      if (json.results && json.results.length > 0) {
        dispatch(moviesActions.setTopRatedMovies(json.results));
      }
    };

    sendRequest(requestConfig, setTopRatedMovies);
  };
};

export const getRecommendedMovies = (sendRequest) => {
  return (dispatch) => {
    const requestConfig = {
      path: "/movie/now_playing?",
    };

    const setRecommendedMovies = (json) => {
      if (json.results && json.results.length > 0) {
        dispatch(moviesActions.setRecommendedMovies(json.results));
      }
    };

    sendRequest(requestConfig, setRecommendedMovies);
  };
};

export const getUserProfile = (sendRequest) => {
  return (dispatch) => {
    const requestConfig = {
      path: `/account?session_id=${getCookie("session_id")}&`,
    };

    const storeUserProfile = (data) => {
      if (data) {
        dispatch(
          userActions.setUser({
            id: data.id,
            username: data.username,
            name: data.name,
            includeAdult: data.include_adult,
            avatar: data.avatar.tmdb.avatar_path,
          }),
        );
      }
    };

    sendRequest(requestConfig, storeUserProfile);
  };
};

export const getFavoriteMovies = (sendRequest) => {
  return (dispatch, getState) => {
    const {
      user: {
        user: { id },
      },
    } = getState();

    const requestConfig = {
      path: `/account/${id}/favorite/movies?session_id=${getCookie(
        "session_id",
      )}&`,
    };

    const setFavoriteMovies = (json) => {
      if (json.results) {
        dispatch(moviesActions.setFavoriteMovie(json.results));
      }
    };

    sendRequest(requestConfig, setFavoriteMovies);
  };
};

export const addFavoriteMovie = (sendRequest, movie, favorite = true) => {
  return async (dispatch, getState) => {
    const {
      movies: { favoriteMovies },
      user: {
        user: { id },
      },
    } = getState();

    const movieIndex = favoriteMovies.findIndex(
      (fMovie) => fMovie.id === movie.id,
    );

    if (movieIndex < 0 || (movieIndex >= 0 && !favorite)) {
      const requestConfig = {
        path: `/account/${id}/favorite?session_id=${getCookie("session_id")}&`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: {
          media_type: movie.media_type ? movie.media_type : "movie",
          media_id: movie.id,
          favorite,
        },
      };

      const getRequestAnswer = (data) => {
        if (data.success) {
          dispatch(getFavoriteMovies(sendRequest));
        }
      };

      sendRequest(requestConfig, getRequestAnswer);
    }
  };
};

export const addAlreadySawTrailers = (movie) => {
  return (dispatch, getState) => {
    const {
      movies: { alreadySawTrailers },
    } = getState();

    const movieIndex = alreadySawTrailers.findIndex(
      (trailer) => trailer.id === movie.id,
    );

    if (movieIndex < 0) {
      const newAlreadySawTrailers = [...alreadySawTrailers, movie];
      dispatch(moviesActions.setAlreadySawTrailers(newAlreadySawTrailers));
    }
  };
};
