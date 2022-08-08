import React from "react";
import PropTypes from "prop-types";

import styles from "./Movie.module.css";

function Movie({ movie, baseUrl, fileSize }) {
  return (
    <img
      src={`${baseUrl}${fileSize}${movie.poster_path}`}
      alt={movie.title}
      className={styles.poster}
    />
  );
}

Movie.propTypes = {
  movie: PropTypes.element.isRequired,
  baseUrl: PropTypes.string.isRequired,
  fileSize: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Movie;
