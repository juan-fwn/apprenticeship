import React from "react";
import PropTypes from "prop-types";

function Header({ children }) {
  return (
    <div className="flex ml-8 mr-6 xl:ml-20 xl:mr-12 pt-14 justify-between">
      {children}
    </div>
  );
}

Header.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Header;
