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

  const onWheelHorizontalScrolling = (e) => {
    // e.preventDefault();
    let element = e.target;
    let foundScroller = false;

    while (element && !foundScroller) {
      if (typeof element.className === "string" && element.className.indexOf("mediaScroller") !== -1) {
        foundScroller = true;
      } else {
        element = element.parentElement;
      }
    }

    if (e.deltaY > 0) element.scrollLeft += 100;
    else element.scrollLeft -= 100;
  };

  return (
    <div
      className={`${styles.mediaScroller}`}
      onWheel={onWheelHorizontalScrolling}
    >
      <div className="text-white font-semibold text-lg">{listName}</div>
      <div className="pt-8 inline-flex flex-row h-96">
        {movies.map((movie) => (
          <div
            key={movie.poster_path}
            className="sm:h-[165px] sm:w-[301px] h-[82px] w-[150px] m-1"
          >
            <Movie
              movie={movie}
              baseUrl={secureBaseUrl}
              fileSize={
                backdropSizes
                  ? backdropSizes[backdropSizes.length - 1]
                  : "original"
              }
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
