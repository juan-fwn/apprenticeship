import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import styles from "./MovieList.module.css";

import Movie from "./Movie";

function MovieList({ listName, movies }) {
  const {
    images: {
      secure_base_url: secureBaseUrl = "",
      backdrop_sizes: backdropSizes = [],
    },
  } = useSelector((state) => state.configuration);

  return (
    <div className={`${styles.mediaScroller} ${styles.snapsInline}`}>
      <div className="text-white font-semibold text-lg">{listName}</div>
      <div className="pt-6 inline-flex flex-row">
        {movies.map((movie) => (
          <div key={movie.poster_path} className="h-[165px] w-[301px] m-1">
            <Movie
              movie={movie}
              baseUrl={secureBaseUrl}
              fileSize={backdropSizes[2]}
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
};

export default MovieList;
