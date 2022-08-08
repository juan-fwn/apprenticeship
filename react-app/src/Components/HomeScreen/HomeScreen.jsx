import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Background from "../UI/Background";
import MovieDetails from "./MovieDetails";
import Header from "./Header";
import MovieList from "./MovieList";
import RecommendedMovie from "./RecommendedMovie";

import { homeScreenActions } from "../../store/slices/homeScreen";
import useHttp from "../../hooks/use-http";

function HomeScreen() {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const { movies = [] } = useSelector((state) => state.homeScreen);

  const { sendRequest } = useHttp();

  useEffect(() => {
    const requestConfig = {
      url: "https://api.themoviedb.org/3/trending/all/day",
    };

    const getMovies = (json) => {
      dispatch(homeScreenActions.setMovies(json.results));
    };

    sendRequest(requestConfig, getMovies);
  }, []);

  return (
    <>
      <Background serieBgImage="https://www.noticierovallarta.com/wp-content/uploads/2022/05/Buenas-noticias-para-los-fanaticos-de-la-ciencia-ficcion-distopica.jpg" />
      <Header open={open} setOpen={setOpen} />
      <MovieDetails openNav={open} />
      <div className="m-12 overflow-x-hidden">
        <MovieList listName="My List" movies={movies} />
      </div>
      <div className="m-12 overflow-x-hidden">
        <MovieList listName="Popular on Movy" movies={movies} />
      </div>
      <div className="m-12 overflow-x-hidden">
        <MovieList listName="Continue Watching for John" movies={movies} />
      </div>
      <RecommendedMovie />
    </>
  );
}

export default HomeScreen;
