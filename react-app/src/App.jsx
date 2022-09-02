import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import useRequest from "./hooks/useRequest";
// import HomeScreen from "./Components/HomeScreen";
import UserLoginScreen from "./Components/UserLoginScreen";
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
          {/* <Route path="/" element={<HomeScreen />} /> */}
          <Route path="/" element={<UserLoginScreen />} />
          <Route path="trailer/:movieId" element={<TrailerPage />} />
          <Route
            path="*"
            element={(
              <div className="w-screen h-screen flex justify-center items-center">
                <p className="text-white font-semibold px-10 py-6 rounded-md bg-gray-400 inline-block border-black border">
                  Wrong URL!
                </p>
              </div>
            )}
          />
        </Routes>
      )}
    </>
  );
}

export default App;
