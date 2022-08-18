import React, { useState } from "react";
import PropTypes from "prop-types";

import styles from "./MovieList.module.css";

import Movie from "./Movie";

function MovieList({
  listName, movies, baseUrl, backdropSizes,
}) {
  const [selectedMovie, setSelectedMovie] = useState();

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
            className={`${
              listName === "Most Viewed"
                ? "h-[340px] w-[250px]"
                : "h-[165px] w-[301px]"
            } m-1 ${index === movies.length - 1 ? "mr-20" : ""}`}
          >
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
};

export default MovieList;
