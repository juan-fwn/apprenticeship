import React from "react";
// import PropTypes from "prop-types";

import chevronDown from "../../assets/chevronDown.svg";
import search from "../../assets/search.svg";
import UserImg from "./UserImg";

function UserMenu() {
  return (
    <div className="flex items-center justify-evenly w-40">
      <img src={search} alt="search" className="hover:cursor-pointer" />
      <UserImg />
      <img
        src={chevronDown}
        alt="chevronDown"
        className="hover:cursor-pointer"
      />
    </div>
  );
}

// UserMenu.propTypes = {
//   open: PropTypes.bool.isRequired,
//   setOpen: PropTypes.func.isRequired,
// };

export default UserMenu;
