import React from "react";
import PropTypes from "prop-types";

function Background({ children, serieBgImage }) {
  return (
    <div
      style={{
        backgroundImage: `url(${serieBgImage})`,
        width: "100vw",
        height: "100vh",
        backgroundSize: "contain",
        position: "absolute",
        zIndex: "-1",
        backgroundRepeat: "no-repeat",
      }}
    >
      {children}
    </div>
  );
}

Background.propTypes = {
  children: PropTypes.element.isRequired,
  serieBgImage: PropTypes.string.isRequired,
};

export default Background;
