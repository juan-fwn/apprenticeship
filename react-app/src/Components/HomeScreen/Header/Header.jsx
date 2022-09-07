import React from "react";
import PropTypes from "prop-types";

import UserMenu from "./UserMenu";
import NavBar from "./NavBar";

function Header({ open, setOpen }) {
  return (
    <div className="flex ml-8 mr-6 xl:ml-20 xl:mr-12 pt-14 justify-between">
      <NavBar open={open} setOpen={setOpen} />
      <UserMenu />
    </div>
  );
}

Header.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default Header;
