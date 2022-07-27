import React from "react";
import PropTypes from "prop-types";

function Background({ children, serieBgImage }) {
  return (
    <div
      style={{
        backgroundImage: `url(${serieBgImage})`,
        objectFit: "cover",
        position: "absolute",
        zIndex: "-1",
        width: "100vw",
        height: "100%",
        // backgroundRepeat: "no-repeat",
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
