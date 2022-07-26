import React from "react";

import Background from "../UI/Background";
import NavBar from "../UI/NavBar";
import MovieDetails from "./MovieDetails";

function HomeScreen() {
  return (
    <Background serieBgImage="https://www.noticierovallarta.com/wp-content/uploads/2022/05/Buenas-noticias-para-los-fanaticos-de-la-ciencia-ficcion-distopica.jpg">
      <NavBar />
      <MovieDetails />
    </Background>
  );
}

export default HomeScreen;
