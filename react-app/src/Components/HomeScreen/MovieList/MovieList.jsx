import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import styles from "./MovieList.module.css";

import triangle from "../../../assets/triangle.svg";
import Movie from "./Movie";
import { addAlreadySawTrailers } from "../../../store/actions/movies";

function MovieList({
  listName,
  movies,
  baseUrl,
  backdropSizes,
  selectedMovie,
  setSelectedMovie,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickMovieHandler = (e, movie) => {
    if (listName === "Recommended movies") {
      setSelectedMovie(movie);
    } else {
      dispatch(addAlreadySawTrailers(movie));
      navigate(`/trailer/${movie.id}`);
    }
  };

  return (
    <>
      <div className="text-white font-semibold text-lg ml-24">{listName}</div>
      <div
        className={`${styles.mediaScroller} ${
          listName.length === 0 && styles["no-padding"]
        }`}
      >
        <div
          data-testid="MovieList"
          className={`pt-8 inline-flex flex-row ${
            listName === "Most Viewed" ? "py-16" : "h-60"
          }`}
        >
          {movies.map((movie, index) => (
            <div
              key={movie?.id.toString()}
              onKeyDown={(e) => onClickMovieHandler(e, movie)}
              onClick={(e) => onClickMovieHandler(e, movie)}
              className={`${
                listName === "Most Viewed"
                  ? "h-[340px] w-[250px]"
                  : "h-[165px] w-[301px]"
              } ${listName.length > 0 ? "m-1" : "my-1 mr-10"} ${
                index === movies.length - 1 ? "mr-20" : ""
              } ${
                selectedMovie?.id === movie?.id ? styles["selected-movie"] : ""
              }`}
            >
              {selectedMovie?.id === movie?.id && (
                <img
                  src={triangle}
                  alt="triangle"
                  className={styles.triangle}
                />
              )}
              <Movie
                movie={movie}
                listName={listName}
                baseUrl={baseUrl}
                fileSize={backdropSizes ? backdropSizes.at(-1) : "original"}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

MovieList.propTypes = {
  listName: PropTypes.string.isRequired,
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
  baseUrl: PropTypes.string.isRequired,
  backdropSizes: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedMovie: PropTypes.objectOf(PropTypes.any),
  setSelectedMovie: PropTypes.func,
};

MovieList.defaultProps = {
  selectedMovie: null,
  setSelectedMovie: () => {},
};

export default MovieList;
