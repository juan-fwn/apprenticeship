import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import styles from "./Movie.module.css";

import { ReactComponent as AddFavorite } from "../../assets/addFavorite.svg";
import { ReactComponent as Share } from "../../assets/share.svg";
import centerDot from "../../assets/centerDot.svg";
// import play from "../../assets/play.svg";
import StarRate from "../UI/StarRate";

function Movie({ movie, baseUrl, fileSize }) {
  const { genres = [] } = useSelector((state) => state.configuration);

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
          <div className="self-start">
            <div className="border rounded-3xl border-gray-500 text-xs w-16 h-7 flex justify-center items-center text-gray-500 font-semibold sm:self-end self-start sm:mt-0 mt-4">
              PG 13
            </div>
          </div>
        </div>
        <div className="pt-4 text-white font-semibold text-2xl">
          {movie?.original_title?.length > 0
            ? movie.original_title
            : movie.name}
        </div>
        <div className="pt-3 flex">
          <StarRate rate={movie?.vote_average} size="small" />
        </div>
        <div className="pt-3 flex">
          {movie.genre_ids.map((id, index) => {
            const genreText = genres.find((genre) => genre.id === id);

            return (
              <>
                {genreText ? (
                  <div key={id} className="text-white text-sm">
                    {genreText?.name}
                  </div>
                ) : null}
                {genreText && index !== movie.genre_ids.length - 1 ? (
                  <img src={centerDot} alt="center-dot" className="ml-2 mr-2" />
                ) : null}
              </>
            );
          })}
          {/* <img src={play} alt="Play" /> */}
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
