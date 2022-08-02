import React from "react";
import PropTypes from "prop-types";

import movy from "../../assets/movy.svg";

const links = [
  { name: "Home", url: "/" },
  { name: "Movies", url: "/" },
  { name: "Series", url: "/" },
  { name: "Recently Added", url: "/" },
  { name: "My List", url: "/" },
];

function NavBar({ open, setOpen }) {
  return (
    <div className="flex justify-between items-center md:w-3/4 w-32 max-w-3xl">
      <div className="">
        <img src={movy} alt="search" />
      </div>
      <div>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="text-3xl cursor-pointer md:hidden relative top-1"
        >
          <ion-icon name={open ? "close" : "menu"} style={{ color: "white" }} />
        </button>
        <ul
          className={`items-center justify-around md:flex transition-all duration-500 ease-in ${
            open
              ? "top-24 md:top-12 absolute md:static rounded-md bg-gray-400 bg-opacity-50 md:bg-inherit ml-2"
              : "hidden"
          }`}
        >
          {links.map((link) => (
            <li
              key={link.name}
              className={`md:ml-10 mx-auto ${
                open
                  ? "md:p-0 py-2 px-4 hover:bg-gray-300 hover:bg-opacity-50 rounded-md"
                  : ""
              }`}
            >
              <a href={link.url} className="text-white text-lg">
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

NavBar.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default NavBar;
