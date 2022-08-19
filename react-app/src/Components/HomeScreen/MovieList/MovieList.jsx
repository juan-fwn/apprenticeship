import React from "react";
import PropTypes from "prop-types";

import styles from "./MovieList.module.css";

import triangle from "../../../assets/triangle.svg";
import Movie from "./Movie";

function MovieList({
  listName,
  movies,
  baseUrl,
  backdropSizes,
  selectedMovie,
  setSelectedMovie,
}) {
  return (
    <div className={`${styles.mediaScroller}`}>
      <div className="text-white font-semibold text-lg">{listName}</div>
      <div
        className={`pt-8 inline-flex flex-row ${
          listName === "Most Viewed" ? "pb-16" : "h-60"
        }`}
      >
        {movies.map((movie, index) => (
          <div
            key={movie?.id.toString()}
            onKeyDown={() => setSelectedMovie(movie)}
            onClick={() => setSelectedMovie(movie)}
            className={`${
              listName === "Most Viewed"
                ? "h-[340px] w-[250px]"
                : "h-[165px] w-[301px]"
            } m-1 ${index === movies.length - 1 ? "mr-20" : ""} ${
              selectedMovie?.id === movie?.id ? styles["selected-movie"] : ""
            }`}
          >
            {selectedMovie?.id === movie?.id && (
              <img src={triangle} alt="triangle" className={styles.triangle} />
            )}
            <Movie
              movie={movie}
              selectedMovie={selectedMovie}
              setSelectedMovie={setSelectedMovie}
              listName={listName}
              baseUrl={baseUrl}
              fileSize={backdropSizes ? backdropSizes.at(-1) : "original"}
            />
          </div>
        ))}
      </div>
    </div>
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
