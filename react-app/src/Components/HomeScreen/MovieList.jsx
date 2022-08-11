import React from "react";
import PropTypes from "prop-types";

import styles from "./MovieList.module.css";

import Movie from "./Movie";

function MovieList({
  listName,
  movies,
  baseUrl,
  backdropSizes,
}) {
  // const onWheelHorizontalScrolling = (e) => {
  //   // e.preventDefault();
  //   let element = e.target;
  //   let foundScroller = false;

  //   while (element && !foundScroller) {

  //       foundScroller = true;
  //     } else {
  //       element = element.parentElement;
  //     }
  //   }

  //   if (e.deltaX > 25) element.scrollLeft += 100;
  //   else element.scrollLeft -= 100;
  // };

  return (
    <div
      className={`${styles.mediaScroller}`}
      // onWheel={onWheelHorizontalScrolling}
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
              baseUrl={baseUrl}
              fileSize={
                backdropSizes
                  ? backdropSizes.at(-1)
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
  baseUrl: PropTypes.string.isRequired,
  backdropSizes: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MovieList;
