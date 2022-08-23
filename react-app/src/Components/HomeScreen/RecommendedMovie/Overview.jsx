import React from "react";
import PropTypes from "prop-types";

import styles from "./Overview.module.css";

import { ReactComponent as AddFavorite } from "../../../assets/addFavorite.svg";
import { ReactComponent as Share } from "../../../assets/share.svg";
import watchTrailer from "../../../assets/watchTrailer.svg";

import StarRate from "../../UI/StarRate";

function Overview({ selectedMovie, genre }) {
  return (
    <>
      <div className="mt-10 flex items-center">
        <StarRate rate={9} size="normal" />
        <div className="ml-6 border rounded-3xl border-white sm:text-lg text-base w-20 h-8 flex justify-center items-center text-white font-semibold sm:self-end self-start sm:mt-0 mt-4">
          PG 13
        </div>
      </div>
      <p className={styles["cut-text"]}>{selectedMovie?.overview}</p>
      <div className="flex items-center flex-col sm:flex-row mt-16">
        <div className="sm:ml-0 mx-auto sm:mr-4 sm:mt-0 mt-7 sm:mb-0 mb-3">
          <img src={watchTrailer} alt="watch-trailer" />
        </div>
        <div className="text-[#92AAD7] text-lg self-center">Watch Trailer</div>
        <div className="sm:ml-14 mx-auto sm:mr-3 sm:mt-0 mt-7 sm:mb-0 mb-3">
          <AddFavorite fill="#92AAD7" />
        </div>
        <div className="text-[#92AAD7] text-lg self-center">Watch Later</div>
        <div className="sm:ml-14 mx-auto sm:mr-3 sm:mt-0 mt-7 sm:mb-0 mb-3">
          <Share fill="#92AAD7" />
        </div>
        <div className="text-[#92AAD7] text-lg self-center">Share</div>
      </div>
      <p className="text-white text-xl mt-16">
        {genre?.length > 0 ? genre : ""}
      </p>
    </>
  );
}

Overview.propTypes = {
  selectedMovie: PropTypes.objectOf(PropTypes.any).isRequired,
  genre: PropTypes.string.isRequired,
};

export default Overview;
