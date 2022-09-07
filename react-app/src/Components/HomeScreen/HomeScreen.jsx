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
import { selectors as userSelector } from "../../store/slices/user";
import {
  getPopularMovies,
  getTopRatedMovies,
  getFavoriteMovies,
  getUserProfile,
  getRecommendedMovies,
} from "../../store/actions/movies";
import useRequest from "../../hooks/useRequest";
import Spinner from "../UI/Spinner";

function HomeScreen() {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const popularMovies = useSelector(selectors.getPopularMovies);
  const topRatedMovies = useSelector(selectors.getTopRatedMovies);
  const recommendedMovies = useSelector(selectors.getRecommendedMovies);
  const favoriteMovies = useSelector(selectors.getFavoriteMovies);
  const alreadySawTrailers = useSelector(selectors.getAlreadySawTrailers);
  const user = useSelector(userSelector.getUser);

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
    return popularMovies.length > 0
      ? popularMovies[getRandomInt(popularMovies.length)]
      : {};
  }, [popularMovies]);
  const randomMovieTrailer = React.useMemo(() => {
    return topRatedMovies.length > 0
      ? topRatedMovies[getRandomInt(topRatedMovies.length)]
      : {};
  }, [topRatedMovies]);

  const { id: accountId } = user;

  useEffect(() => {
    if (accountId) {
      dispatch(getFavoriteMovies(sendRequest));
    }
  }, [accountId]);

  useEffect(() => {
    if (popularMovies && popularMovies.length === 0) {
      dispatch(getPopularMovies(sendRequest));
    }
  }, [popularMovies]);

  useEffect(() => {
    if (topRatedMovies && topRatedMovies.length === 0) {
      dispatch(getTopRatedMovies(sendRequest));
    }
  }, [topRatedMovies]);

  useEffect(() => {
    if (recommendedMovies && recommendedMovies.length === 0) {
      dispatch(getRecommendedMovies(sendRequest));
    }
  }, [recommendedMovies]);

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

    if (
      !userProfile
      || Object.keys(userProfile).length === 0
      || !user
      || Object.keys(user).length === 0
    ) {
      dispatch(getUserProfile(sendRequest));
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
          {favoriteMovies && favoriteMovies.length > 0 && (
            <div className={`mt-14 ${open && "mt-40"}`}>
              <MovieList
                listName="My List"
                movies={favoriteMovies}
                baseUrl={secureBaseUrl}
                backdropSizes={backdropSizes}
              />
            </div>
          )}
          {popularMovies && popularMovies.length > 0 && (
            <div className={`${favoriteMovies.length > 0 ? "" : `mt-14 ${open && "mt-40"}`} ${alreadySawTrailers.length === 0 && "mb-10"}`}>
              <MovieList
                listName="Popular on Movy"
                movies={popularMovies}
                baseUrl={secureBaseUrl}
                backdropSizes={backdropSizes}
              />
            </div>
          )}
          {alreadySawTrailers && alreadySawTrailers.length > 0 && (
            <div className="mb-10">
              <MovieList
                listName={`Continue Watching for ${user.name}`}
                movies={alreadySawTrailers}
                baseUrl={secureBaseUrl}
                backdropSizes={backdropSizes}
              />
            </div>
          )}
          <TrailerSection
            movie={randomMovieTrailer}
            serieBgImage={`${secureBaseUrl}${backdropSizes.at(-1)}${
              randomMovieTrailer.backdrop_path
            }`}
          />
          {topRatedMovies && topRatedMovies.length > 0 && (
            <div className="mt-20">
              <MovieList
                listName="Most Viewed"
                movies={topRatedMovies}
                baseUrl={secureBaseUrl}
                backdropSizes={backdropSizes}
              />
            </div>
          )}
          {recommendedMovies && recommendedMovies.length > 0 && (
            <div>
              <MovieList
                listName="Recommended movies"
                movies={recommendedMovies}
                baseUrl={secureBaseUrl}
                backdropSizes={backdropSizes}
                selectedMovie={selectedMovie}
                setSelectedMovie={setSelectedMovie}
              />
            </div>
          )}
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
