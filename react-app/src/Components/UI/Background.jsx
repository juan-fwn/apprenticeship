import React from "react";
import PropTypes from "prop-types";

import styles from "./Background.module.css";

function Background({ serieBgImage }) {
  return (
    <img src={serieBgImage} alt="Background" className={styles.background} />
  );
}

Background.propTypes = {
  serieBgImage: PropTypes.string.isRequired,
};

export default Background;
