import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import HomeScreen from "./Components/HomeScreen";
import { configurationActions } from "./store/slices/configuration";

// require("dotenv").config();

// const token = process.env.API_KEY;
const token = "df7ba0e57e5998b3482646f2dded6d32";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/configuration?api_key=${token}`,
      );

      const json = await response.json();

      dispatch(configurationActions.setImages(json.images));
    };

    getMovies();
  }, []);

  return <HomeScreen />;
}

export default App;
