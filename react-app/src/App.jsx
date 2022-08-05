import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import HomeScreen from "./Components/HomeScreen";
import useHttp from "./hooks/use-http";
import { configurationActions } from "./store/slices/configuration";

function App() {
  const dispatch = useDispatch();
  // const { isLoading, error, sendRequest } = useHttp();
  const { sendRequest } = useHttp();

  useEffect(() => {
    const requestConfig = {
      url: `https://api.themoviedb.org/3/configuration`,
    };

    const getImages = (json) => {
      dispatch(configurationActions.setImages(json.images));
    };

    sendRequest(requestConfig, getImages);
  }, []);

  return <HomeScreen />;
}

export default App;
