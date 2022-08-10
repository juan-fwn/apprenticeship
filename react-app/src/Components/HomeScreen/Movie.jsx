import React from "react";
import PropTypes from "prop-types";

import styles from "./Movie.module.css";

import { ReactComponent as AddFavorite } from "../../assets/addFavorite.svg";
import { ReactComponent as Share } from "../../assets/share.svg";
import StarRate from "../UI/StarRate";

function Movie({ movie, baseUrl, fileSize }) {
  return (
    <div className={styles.poster}>
      <img
        src={`${baseUrl}${fileSize}${movie.poster_path}`}
        alt={movie.title}
        className={styles.image}
      />
      <div className={styles["image-overlay"]}>
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center">
            <div className="inline-block">
              <AddFavorite fill="gray" />
            </div>
            <div className="inline-block ml-2">
              <Share fill="gray" />
            </div>
          </div>
          <div>
            <div className="border rounded-3xl border-gray-500 text-xs w-16 h-7 flex justify-center items-center text-gray-500 font-semibold sm:self-end self-start sm:mt-0 mt-4">
              PG 13
            </div>
          </div>
        </div>
        <div className="pt-4 text-white font-semibold text-2xl">Aladdin</div>
        <div className="pt-1 flex">
          <StarRate />
        </div>
      </div>
    </div>
  );
}

Movie.propTypes = {
  movie: PropTypes.objectOf(PropTypes.any).isRequired,
  baseUrl: PropTypes.string.isRequired,
  fileSize: PropTypes.string,
};

Movie.defaultProps = {
  fileSize: "original",
};

export default Movie;
