import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import HomeScreen from "./Components/HomeScreen";
import useRequest from "./hooks/useRequest";
import { configurationActions } from "./store/slices/configuration";
import { moviesActions } from "./store/slices/movies";

function App() {
  const dispatch = useDispatch();
  // const { isLoading, error, sendRequest } = useHttp();
  const { sendRequest } = useRequest();

  useEffect(() => {
    const requestConfig = {
      path: `/configuration`,
    };

    const getImages = (json) => {
      dispatch(configurationActions.setImagesSettings(json.images));
    };

    sendRequest(requestConfig, getImages);
  }, []);

  useEffect(() => {
    const requestConfig = {
      path: `/genre/movie/list`,
    };

    const getGenres = (json) => {
      dispatch(moviesActions.setGenreList(json.genres));
    };

    sendRequest(requestConfig, getGenres);
  }, []);

  return <HomeScreen />;
}

export default App;
