import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import useRequest from "./hooks/useRequest";
import HomeScreen from "./Components/HomeScreen";
import Spinner from "./Components/UI/Spinner";
import {
  configurationActions,
  selectors as configSelectors,
} from "./store/slices/configuration";
import { moviesActions } from "./store/slices/movies";

function App() {
  const dispatch = useDispatch();

  const isLoading = useSelector(configSelectors.getIsLoading);
  console.log({ isLoading });

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

  return <>{isLoading ? <Spinner /> : <HomeScreen />}</>;
}

export default App;
