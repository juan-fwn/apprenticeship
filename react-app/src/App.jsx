import React, { useEffect } from "react";
import HomeScreen from "./Components/HomeScreen";

require("dotenv").config();

const token = process.env.API_KEY;

console.log({ token });

function App() {
  useEffect(() => {
    const getMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/76341?api_key=${token}`,
      );

      const json = await response.json();

      // eslint-disable-next-line no-console
      console.log({ response });
      // eslint-disable-next-line no-console
      console.log({ json });
    };

    getMovies();
  }, []);

  return <HomeScreen />;
}

export default App;
