import React from "react";
// import PropTypes from "prop-types";

import chevronDown from "../../../assets/chevronDown.svg";
import search from "../../../assets/search.svg";

function UserMenu() {
  return (
    <div className="flex items-center justify-evenly w-40">
      <img src={search} alt="search" className="hover:cursor-pointer" />
      <img
        className="rounded-full h-10 w-10 border-2 border-blue-700 object-cover"
        src="https://www.lavanguardia.com/files/fp/uploads/2022/06/03/6299acf680f97.r_d.348-394-0.jpeg"
        alt="User"
      />
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
