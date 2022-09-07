import React, { useEffect } from "react";
import { Routes, Route, useSearchParams } from "react-router-dom";

import { getCookie } from "./utils";

import useRequest from "./hooks/useRequest";
import HomeScreen from "./Components/HomeScreen";
import UserLoginScreen from "./Components/UserLoginScreen";
import Spinner from "./Components/UI/Spinner";
import TrailerPage from "./Components/TrailerPage";
import UserProfile from "./Components/UserProfile";

function App() {
  const [searchParams] = useSearchParams();

  const { isLoading, sendRequest } = useRequest();

  const requestToken = searchParams.get("request_token");
  const approved = searchParams.get("approved");

  useEffect(() => {
    if (getCookie("session_id").length === 0 && approved) {
      const requestConfig = {
        path: `/authentication/session/new?request_token=${requestToken}&`,
        method: "POST",
      };

      const getIdSession = (json) => {
        if (json.success) {
          document.cookie = `session_id=${json.session_id}`;
        }
      };

      sendRequest(requestConfig, getIdSession);
    }
  }, [requestToken, approved]);

  return (
    <>
      {isLoading ? (
        <div className="w-screen h-screen bg-[rgba(0,0,0,0.7)] flex justify-center items-center">
          <Spinner size="large" />
        </div>
      ) : (
        <Routes>
          <Route
            path="/"
            element={getCookie("session_id").length > 0 ? <HomeScreen /> : <UserLoginScreen />}
          />
          <Route path="profile" element={<UserProfile />} />
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
