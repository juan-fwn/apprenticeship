import React from "react";
import PropTypes from "prop-types";

import styles from "./Spinner.module.css";

function Spinner({ size }) {
  return <span data-testid="Spinner" className={`${styles.loader} ${styles[size]}`} />;
}

Spinner.propTypes = {
  size: PropTypes.string,
};

Spinner.defaultProps = {
  size: "small",
};

export default Spinner;
