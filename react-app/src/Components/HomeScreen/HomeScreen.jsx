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

  const { sendRequest } = useHttp();

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
      <Background serieBgImage="https://www.noticierovallarta.com/wp-content/uploads/2022/05/Buenas-noticias-para-los-fanaticos-de-la-ciencia-ficcion-distopica.jpg" />
      <Header open={open} setOpen={setOpen} />
      <MovieDetails openNav={open} />
      <MovieList listName="Popular on Movy" movies={movies} />
    </>
  );
}

export default HomeScreen;
