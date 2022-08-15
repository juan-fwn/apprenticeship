import React from "react";
import PropTypes from "prop-types";
import styles from "./Trailer.module.css";

import { ReactComponent as AddFavorite } from "../../assets/addFavorite.svg";
import Background from "../UI/Background";
import StarRate from "../UI/StarRate";
import imbd from "../../assets/imbd.svg";

function Trailer({ serieBgImage, movie }) {
  return (
    <>
      <Background serieBgImage={serieBgImage} type="trailer" />
      <div className="sm:p-16 p-2 flex sm:flex-row flex-col">
        <div className="sm:w-7/12 w-full h-96 inline-block sm:p-10 px-3">
          <iframe
            src="https://www.youtube.com/embed/tgbNymZ7vqY"
            title="trailer"
            width="100%"
            height="100%"
            allowFullScreen
          />
        </div>
        <div className="sm:w-5/12 w-full px-4 inline-block sm:pt-6 mt-20 sm:mt-0 self-center">
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
              <StarRate rate={movie?.vote_average} size="normal" />
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

Trailer.propTypes = {
  serieBgImage: PropTypes.string.isRequired,
  movie: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Trailer;
