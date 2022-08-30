import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import arrowBack from "../../assets/arrowBack.svg";
import Spinner from "../UI/Spinner";
import useRequest from "../../hooks/useRequest";

function TrailerPage() {
  const { movieId } = useParams();
  const [trailerUrl, setTrailerUrl] = useState("");

  const { error, isLoading, sendRequest } = useRequest();

  useEffect(() => {
    if (movieId) {
      const requestConfig = {
        path: `/movie/${movieId}/videos`,
      };

      const getTrailer = (json) => {
        const trailer = json.results.find(
          (result) => result.type === "Trailer",
        );

        if (trailer) {
          setTrailerUrl(trailer?.key);
        } else {
          setTrailerUrl("");
        }
      };

      sendRequest(requestConfig, getTrailer);
    }
  }, [movieId]);

  return (
    <>
      {isLoading ? (
        <div className="w-screen h-screen bg-[rgba(0,0,0,0.7)] flex justify-center items-center">
          <Spinner size="large" />
        </div>
      ) : (
        <div className="relative h-screen">
          <Link to="/" className="absolute top-16 left-4 hover:cursor-pointer">
            <img src={arrowBack} alt="back-arrow" />
          </Link>
          {error || !trailerUrl || trailerUrl.length === 0 ? (
            <div className="h-screen flex justify-center items-center">
              <p className="p-6 bg-gray-400 text-rose-600 font-semibold rounded-md inline-block">
                Trailer not found!
              </p>
            </div>
          ) : (
            <iframe
              src={`https://www.youtube.com/embed/${trailerUrl}`}
              title="trailer"
              width="100%"
              height="100%"
              allowFullScreen
            />
          )}
        </div>
      )}
    </>
  );
}

export default TrailerPage;
