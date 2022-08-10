import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import HomeScreen from "./Components/HomeScreen";
import useHttp from "./hooks/useHttp";
import { configurationActions } from "./store/slices/configuration";

function App() {
  const dispatch = useDispatch();
  // const { isLoading, error, sendRequest } = useHttp();
  const { sendRequest } = useHttp();

  useEffect(() => {
    const requestConfig = {
      path: `/configuration`,
    };

    const getImages = (json) => {
      dispatch(configurationActions.setImagesConfiguration(json.images));
    };

    sendRequest(requestConfig, getImages);
  }, []);

  useEffect(() => {
    const requestConfig = {
      path: `/genre/movie/list`,
    };

    const getGenres = (json) => {
      dispatch(configurationActions.setGenresList(json.genres));
    };

    sendRequest(requestConfig, getGenres);
  }, []);

  return <HomeScreen />;
}

export default App;
