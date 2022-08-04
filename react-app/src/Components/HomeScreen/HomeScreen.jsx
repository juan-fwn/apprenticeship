import React, { useState, useEffect } from "react";

import Background from "../UI/Background";
import MovieDetails from "./MovieDetails";
import Header from "./Header";

import MovieList from "./MovieList";

// require("dotenv").config();

// const token = process.env.API_KEY;
const token = "df7ba0e57e5998b3482646f2dded6d32";

console.log({ token });

function HomeScreen() {
  const [open, setOpen] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/trending/all/day?api_key=${token}`,
      );

      const json = await response.json();

      setMovies(json.results);
    };

    getMovies();
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
