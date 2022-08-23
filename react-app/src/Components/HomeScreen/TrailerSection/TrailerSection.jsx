import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import styles from "./TrailerSection.module.css";

import { ReactComponent as AddFavorite } from "../../../assets/addFavorite.svg";
import Background from "../../UI/Background/Background";
import StarRate from "../../UI/StarRate";
import Spinner from "../../UI/Spinner";
import imbd from "../../../assets/imbd.svg";

import useRequest from "../../../hooks/useRequest";

function TrailerSection({ serieBgImage, movie }) {
  const [trailerUrl, setTrailerUrl] = useState("");

  const { isLoading, sendRequest } = useRequest();

  useEffect(() => {
    if (Object.keys(movie).length) {
      const requestConfig = {
        path: `/movie/${movie?.id}/videos`,
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
  }, [movie]);

  return (
    <>
      <Background serieBgImage={serieBgImage} type="trailer" />
      <div className={styles["trailer-shadow"]}>
        {isLoading ? (
          <div className="sm:w-7/12 w-5/6 flex justify-center items-center">
            <Spinner size="medium" />
          </div>
        ) : (
          <>
            {trailerUrl ? (
              <div className="sm:w-7/12 w-5/6 h-96 sm:max-w-4xl inline-block sm:m-10 mx-3 sm:mr-11 lg:order-1 order-2 mt-14">
                <iframe
                  src={`https://www.youtube.com/embed/${trailerUrl}`}
                  title="trailer"
                  width="100%"
                  height="100%"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="text-red-600 text-2xl p-4 rounded-lg bg-gray-700 w-full sm:w-7/12 flex justify-center items-center sm:mr-11 lg:order-1 order-2 lg:mt-0 mt-10">
                Error! Trailer not found.
              </div>
            )}
          </>
        )}
        <div className="sm:w-5/12 w-full px-4 inline-block sm:pt-6 mt-20 sm:mt-0 self-center lg:order-2 order-1">
          <div className="flex justify-between items-center">
            <p className="font-semibold sm:text-4xl text-3xl text-[#aba2a2]">
              Movy
            </p>
            <div className="border rounded-3xl border-[#aba2a2] text-sm w-20 h-8 flex justify-center items-center text-[#aba2a2] font-semibold sm:self-end self-start sm:mt-0 mt-4">
              PG 13
            </div>
          </div>
          <p className="text-white font-semibold pt-7 sm:text-6xl text-4xl">
            {movie?.original_title?.length > 0
              ? movie.original_title
              : movie.name}
          </p>
          <div className="pt-9 flex items-center">
            <button type="button" className={styles.button}>
              <div className="mr-4">
                <AddFavorite fill="#92AAD7" />
              </div>
              <div className="text-[#92AAD7] text-lg self-center">
                Watch Later
              </div>
            </button>
            <div className="flex h-4 ml-9">
              <StarRate rate={movie?.vote_average || 0} size="normal" />
            </div>
          </div>
          <h1 className="pt-9 text-white sm:text-3xl text-2xl">
            Coming August 30
          </h1>
          <p className="pt-6 text-white sm:text-xl text-base">
            {movie?.overview}
          </p>
          <img src={imbd} alt="imbd" className="pt-10" />
        </div>
      </div>
    </>
  );
}

TrailerSection.propTypes = {
  serieBgImage: PropTypes.string.isRequired,
  movie: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default TrailerSection;
