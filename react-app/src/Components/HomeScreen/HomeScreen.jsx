import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./HomeScreen.module.css";

import Background from "../UI/Background";
import MovieDetails from "./MovieDetails";
import Header from "./Header";
import MovieList from "./MovieList";
import TrailerSection from "./TrailerSection";
import Footer from "./Footer";

import { selectors as configSelectors } from "../../store/slices/configuration";
import { moviesActions, selectors } from "../../store/slices/movies";
import useRequest from "../../hooks/useRequest";

function HomeScreen() {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const movies = useSelector(selectors.getMovies);

  const imageSettings = useSelector(configSelectors.getImageSettings);
  const {
    secure_base_url: secureBaseUrl = "",
    backdrop_sizes: backdropSizes = [],
  } = imageSettings;

  const { sendRequest } = useRequest();

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const randomMovie = React.useMemo(() => {
    return movies.length > 0 ? movies[getRandomInt(movies.length)] : {};
  }, [movies]);
  const randomMovieTrailer = React.useMemo(() => {
    return movies.length > 0 ? movies[getRandomInt(movies.length)] : {};
  }, [movies]);

  useEffect(() => {
    const requestConfig = {
      path: "/trending/all/day",
    };

    const getMovies = (json) => {
      dispatch(moviesActions.setMovieList(json.results));
    };

    sendRequest(requestConfig, getMovies);
  }, []);

  return (
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
      <MovieList
        listName="Popular on Movy"
        movies={movies}
        baseUrl={secureBaseUrl}
        backdropSizes={backdropSizes}
      />
      <TrailerSection
        movie={randomMovieTrailer}
        serieBgImage={`${secureBaseUrl}${backdropSizes.at(-1)}${
          randomMovieTrailer.backdrop_path
        }`}
      />
      <MovieList
        listName="Most Viewed"
        movies={movies}
        baseUrl={secureBaseUrl}
        backdropSizes={backdropSizes}
      />
      <Footer />
    </>
  );
}

export default HomeScreen;
