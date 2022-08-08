import React from "react";
// import PropTypes from "prop-types";
import styles from "./RecommendedMovie.module.css";

function RecommendedMovie() {
  return (
    <div className={styles.background}>
      <img
        src="https://sm.ign.com/t/ign_latam/screenshot/default/neo-trinity-1_qzzy.1280.jpg"
        alt="Matrix"
        className={styles.image}
      />
    </div>
  );
}

// RecommendedMovie.propTypes = {
//   listName: PropTypes.string.isRequired,
//   movies: PropTypes.arrayOf(PropTypes.object).isRequired,
// };

export default RecommendedMovie;
