import React from "react";
import PropTypes from "prop-types";

function MovieList({ listName, movies }) {
  return (
    <div className="m-12">
      <div className="text-white font-semibold text-lg">{listName}</div>
      <div>
        {movies.map((movie) => (
          <img src={movie.poster_path} alt={movie.title} />
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
