import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Background from "../UI/Background";
import MovieDetails from "./MovieDetails";
import Header from "./Header";
import MovieList from "./MovieList";

import { moviesSliceActions } from "../../store/slices/moviesSlice";
import useHttp from "../../hooks/useHttp";

function HomeScreen() {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const { movies = [] } = useSelector((state) => state.movies);
  const {
    images: {
      secure_base_url: secureBaseUrl = "",
      backdrop_sizes: backdropSizes = [],
    },
  } = useSelector((state) => state.configuration);

  const { sendRequest } = useHttp();

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const randomMovie = movies.length > 0 ? movies[getRandomInt(movies.length)] : {};

  console.log({ randomMovie });

  useEffect(() => {
    const requestConfig = {
      path: "/trending/all/day",
    };

    const getMovies = (json) => {
      dispatch(moviesSliceActions.setMovies(json.results));
    };

    sendRequest(requestConfig, getMovies);
  }, []);

  return (
    <>
      <Background serieBgImage={`${secureBaseUrl}${backdropSizes[backdropSizes.length - 1]}${randomMovie.backdrop_path}`} />
      <Header open={open} setOpen={setOpen} />
      <MovieDetails openNav={open} selectedMovie={randomMovie} />
      <MovieList listName="Popular on Movy" movies={movies} />
    </>
  );
}

export default HomeScreen;
