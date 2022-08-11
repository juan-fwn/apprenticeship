import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import styles from "./Movie.module.css";

import { ReactComponent as AddFavorite } from "../../assets/addFavorite.svg";
import { ReactComponent as Share } from "../../assets/share.svg";
import play from "../../assets/play.svg";
import StarRate from "../UI/StarRate";

function Movie({ movie, baseUrl, fileSize }) {
  const { genres = [] } = useSelector((state) => state.configuration);

  const genreList = movie?.genre_ids
    ?.filter((id) => genres.some((genre) => genre.id === id))
    .map((genreId) => genres.find((genre) => genre.id === genreId)?.name);

  const genrePlainText = genreList?.join(" • ");

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
              <AddFavorite fill="#aba2a2" />
            </div>
            <div className="inline-block ml-2">
              <Share fill="#aba2a2" />
            </div>
          </div>
          <div className="self-start">
            <div className="border rounded-3xl border-[#aba2a2] text-xs w-16 h-7 flex justify-center items-center text-[#aba2a2] font-semibold sm:self-end self-start sm:mt-0 mt-4">
              PG 13
            </div>
          </div>
        </div>
        <div className={styles["movie-title"]}>
          {movie?.original_title?.length > 0
            ? movie.original_title
            : movie.name}
        </div>
        <div className="pt-3 flex">
          <StarRate rate={movie?.vote_average} size="small" />
        </div>
        <div className="pt-3 text-white text-sm flex justify-between items-center">
          <p className={styles["cut-text"]}>
            {genrePlainText?.length > 0 ? genrePlainText : ""}
          </p>
          <div>
            <img src={play} alt="Play" />
          </div>
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
