import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import useRequest from "./hooks/useRequest";
import HomeScreen from "./Components/HomeScreen";
import Spinner from "./Components/UI/Spinner";
import { configurationActions } from "./store/slices/configuration";
import { moviesActions } from "./store/slices/movies";

function App() {
  const dispatch = useDispatch();

  const { isLoading, sendRequest } = useRequest();

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

  return (
    <>
      {isLoading ? (
        <div className="w-screen h-screen bg-[rgba(0,0,0,0.7)] flex justify-center items-center">
          <Spinner size="large" />
        </div>
      ) : (
        <HomeScreen />
      )}
    </>
  );
}

export default App;
