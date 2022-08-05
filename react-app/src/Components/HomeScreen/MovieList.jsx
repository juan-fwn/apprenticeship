import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

function MovieList({ listName, movies }) {
  const {
    images: { secure_base_url: secureBaseUrl = "", logo_sizes: backdropSizes = [] },
  } = useSelector((state) => state.configuration);

  return (
    <>
      <div className="text-white font-semibold text-lg">{listName}</div>
      <div className="flex mt-6">
        {movies.map((movie) => (
          <div key={movie.poster_path}>
            <img
              src={`${secureBaseUrl}${backdropSizes[3]}${movie.poster_path}`}
              alt={movie.title}
            />
          </div>
        ))}
      </div>
    </>
  );
}

MovieList.propTypes = {
  listName: PropTypes.string.isRequired,
  movies: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MovieList;
