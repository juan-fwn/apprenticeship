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

import { selectors as configSelectors } from "../../store/slices/configuration";
import { moviesActions, selectors } from "../../store/slices/movies";
import useRequest from "../../hooks/useRequest";

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
    if (movies && movies.length === 0) {
      const requestConfig = {
        path: "/trending/all/day",
      };

      const getMovies = (json) => {
        if (json.results && json.results.length > 0) {
          dispatch(moviesActions.setMovieList(json.results));
        }
      };

      sendRequest(requestConfig, getMovies);
    }
  }, [movies]);

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
      <div className="my-14">
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
      <Footer />
    </>
  );
}

export default HomeScreen;
