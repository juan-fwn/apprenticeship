import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import useRequest from "./hooks/useRequest";
import HomeScreen from "./Components/HomeScreen";
import Spinner from "./Components/UI/Spinner";
import { configurationActions } from "./store/slices/configuration";
import { moviesActions } from "./store/slices/movies";
import TrailerPage from "./Components/TrailerPage";

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
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="trailer/:movieId" element={<TrailerPage />} />
          <Route
            path="*"
            element={(
              <p className="text-white font-semibold p-6 rounded-md bg-gray-400 inline-block border-black border">
                Wrong URL!
              </p>
            )}
          />
        </Routes>
      )}
    </>
  );
}

export default App;
