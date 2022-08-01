import React, { useState } from "react";

import Background from "../UI/Background";
import NavBar from "../UI/NavBar";
import MovieDetails from "./MovieDetails";

function HomeScreen() {
  const [open, setOpen] = useState(false);

  return (
    <Background serieBgImage="https://www.noticierovallarta.com/wp-content/uploads/2022/05/Buenas-noticias-para-los-fanaticos-de-la-ciencia-ficcion-distopica.jpg">
      <NavBar open={open} setOpen={setOpen} />
      <MovieDetails openNav={open} />
    </Background>
  );
}

export default HomeScreen;
