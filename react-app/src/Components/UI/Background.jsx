import React from "react";
import PropTypes from "prop-types";

import styles from "./Background.module.css";

function Background({ serieBgImage, type }) {
  return (
    <div className={`${styles.shadow} ${styles[type]}`}>
      <img
        src={serieBgImage}
        alt="Background"
        className={`${styles.background} ${styles[type]}`}
      />
    </div>
  );
}

Background.propTypes = {
  serieBgImage: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Background;
