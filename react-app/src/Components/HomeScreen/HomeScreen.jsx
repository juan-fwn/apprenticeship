import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./HomeScreen.module.css";

import Background from "../UI/Background";
import MovieDetails from "./MovieDetails";
import Header from "./Header";
import MovieList from "./MovieList";
import TrailerSection from "./TrailerSection";
import RecommendedMovie from "./RecommendedMovie";
import Footer from "../UI/Footer";

import {
  selectors as configSelectors,
  configurationActions,
} from "../../store/slices/configuration";
import { moviesActions, selectors } from "../../store/slices/movies";
import { userActions } from "../../store/slices/user";
import useRequest from "../../hooks/useRequest";
import Spinner from "../UI/Spinner";

function HomeScreen() {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const movies = useSelector(selectors.getMovies);

  const imageSettings = useSelector(configSelectors.getImageSettings);
  const {
    secure_base_url: secureBaseUrl = "",
    backdrop_sizes: backdropSizes = [],
  } = imageSettings;

  const { isLoading, sendRequest } = useRequest();

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const randomMovie = React.useMemo(() => {
    return movies.length > 0 ? movies[getRandomInt(movies.length)] : {};
  }, [movies]);
  const randomMovieTrailer = React.useMemo(() => {
    return movies.length > 0 ? movies[getRandomInt(movies.length)] : {};
  }, [movies]);

  const getCookie = (key) => {
    const cookies = document.cookie;
    const cookieArray = cookies.split(";");
    const foundCookie = cookieArray.find((cookie) => cookie.includes(key));

    if (foundCookie) {
      return foundCookie.split("=")[1];
    }
    return "";
  };

  useEffect(() => {
    if (movies && movies.length === 0) {
      const requestConfig = {
        path: "/trending/all/day?",
      };

      const getMovies = (json) => {
        if (json.results && json.results.length > 0) {
          dispatch(moviesActions.setMovieList(json.results));
        }
      };

      sendRequest(requestConfig, getMovies);
    }
  }, [movies]);

  useEffect(() => {
    const requestConfig = {
      path: `/configuration?`,
    };

    const getImages = (json) => {
      dispatch(configurationActions.setImagesSettings(json.images));
    };

    sendRequest(requestConfig, getImages);
  }, []);

  useEffect(() => {
    const requestConfig = {
      path: `/genre/movie/list?`,
    };

    const getGenres = (json) => {
      dispatch(moviesActions.setGenreList(json.genres));
    };

    sendRequest(requestConfig, getGenres);
  }, []);

  useEffect(() => {
    const userProfile = JSON.parse(localStorage.getItem("userProfile"));

    if (!userProfile || Object.keys(userProfile).length === 0) {
      const requestConfig = {
        path: `/account?session_id=${getCookie("session_id")}&`,
      };

      const saveData = (data) => {
        if (data) {
          dispatch(
            userActions.setUser({
              username: data.username,
              name: data.name,
              includeAdult: data.include_adult,
              avatar: data.avatar.tmdb.avatar_path,
            }),
          );
        }
      };

      sendRequest(requestConfig, saveData);
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="w-screen h-screen flex justify-center items-center">
          <Spinner size="large" />
        </div>
      ) : (
        <>
          <Background
            serieBgImage={`${secureBaseUrl}${backdropSizes.at(-1)}${
              randomMovie.backdrop_path
            }`}
            type="home"
          />
          <div className={styles.background}>
            <Header open={open} setOpen={setOpen} />
            <MovieDetails openNav={open} selectedMovie={randomMovie} />
          </div>
          <div className={`my-14 ${open && "mt-40"}`}>
            <MovieList
              listName="Popular on Movy"
              movies={movies}
              baseUrl={secureBaseUrl}
              backdropSizes={backdropSizes}
            />
          </div>
          <TrailerSection
            movie={randomMovieTrailer}
            serieBgImage={`${secureBaseUrl}${backdropSizes.at(-1)}${
              randomMovieTrailer.backdrop_path
            }`}
          />
          <div className="mt-20">
            <MovieList
              listName="Most Viewed"
              movies={movies}
              baseUrl={secureBaseUrl}
              backdropSizes={backdropSizes}
            />
          </div>
          <div>
            <MovieList
              listName="Recommended movies"
              movies={movies}
              baseUrl={secureBaseUrl}
              backdropSizes={backdropSizes}
              selectedMovie={selectedMovie}
              setSelectedMovie={setSelectedMovie}
            />
          </div>
          {selectedMovie && (
            <div className="mt-2">
              <RecommendedMovie
                selectedMovie={selectedMovie}
                setSelectedMovie={setSelectedMovie}
              />
            </div>
          )}
          <div className="mt-16">
            <Footer />
          </div>
        </>
      )}
    </>
  );
}

export default HomeScreen;
