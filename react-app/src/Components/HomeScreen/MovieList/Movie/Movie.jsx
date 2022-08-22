import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import styles from "./Movie.module.css";

import { ReactComponent as AddFavorite } from "../../../../assets/addFavorite.svg";
import { ReactComponent as Share } from "../../../../assets/share.svg";
import play from "../../../../assets/play.svg";
import StarRate from "../../../UI/StarRate";

import { selectors } from "../../../../store/slices/movies";

function Movie({
  movie, baseUrl, fileSize, listName,
}) {
  const genres = useSelector(selectors.getGenres);

  const genreList = movie?.genre_ids
    ?.filter((id) => genres.some((genre) => genre.id === id))
    .map((genreId) => genres.find((genre) => genre.id === genreId)?.name);

  const genrePlainText = genreList?.join(" • ");

  return (
    <div
      className={`${listName !== "Recommended movies" ? styles.poster : "relative h-full"} ${
        listName === "Most Viewed" ? styles["light-blue_shadow"] : ""
      }`}
    >
      <img
        src={`${baseUrl}${fileSize}${movie?.poster_path}`}
        alt={movie?.title}
        className={`${styles.image} ${
          listName === "Most Viewed" ? styles["most-viewed-image"] : ""
        }`}
      />
      {listName !== "Recommended movies" && (
        <div className={styles["image-overlay"]}>
          <div className="flex flex-row justify-between">
            <div className="flex flex-row items-center">
              {listName === "Popular on Movy" && (
                <>
                  <div className="inline-block">
                    <AddFavorite fill="#aba2a2" />
                  </div>
                  <div className="inline-block ml-2">
                    <Share fill="#aba2a2" />
                  </div>
                </>
              )}
            </div>
            <div className="self-start">
              <div className="border rounded-3xl border-[#aba2a2] text-xs w-16 h-7 flex justify-center items-center text-[#aba2a2] font-semibold sm:self-end self-start sm:mt-0 mt-4">
                PG 13
              </div>
            </div>
          </div>
          {listName === "Most Viewed" && (
            <div className="flex justify-center mt-20">
              <img src={play} alt="Play" className="w-20 h-20" />
            </div>
          )}
          <div
            className={`${
              listName === "Most Viewed"
              && "mt-4 flex items-center justify-between"
            }`}
          >
            <div
              className={`${styles["movie-title"]} ${
                listName === "Most Viewed" && styles["movie-title-most-viewed"]
              }`}
            >
              {movie?.original_title?.length > 0
                ? movie?.original_title
                : movie?.name}
            </div>
            <div className="pt-3 inline-block">
              <div className="flex">
                <StarRate rate={movie?.vote_average || 0} size="small" />
              </div>
            </div>
          </div>
          <div className="pt-2 text-white text-sm flex justify-between items-center">
            {listName === "Most Viewed" ? (
              <div className="flex items-center">
                <AddFavorite fill="#aba2a2" />
                <p className="ml-2">Watch Later</p>
              </div>
            ) : (
              <p className={styles["cut-text"]}>
                {genrePlainText?.length > 0 ? genrePlainText : ""}
              </p>
            )}
            {listName === "Most Viewed" ? (
              <div className="flex items-center">
                <Share fill="#aba2a2" />
                <p className="ml-2">Share</p>
              </div>
            ) : (
              <div>
                <img src={play} alt="Play" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

Movie.propTypes = {
  movie: PropTypes.objectOf(PropTypes.any).isRequired,
  baseUrl: PropTypes.string.isRequired,
  fileSize: PropTypes.string,
  listName: PropTypes.string.isRequired,
};

Movie.defaultProps = {
  fileSize: "original",
};

export default Movie;
