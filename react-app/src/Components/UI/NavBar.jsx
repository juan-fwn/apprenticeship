import React from "react";
import PropTypes from "prop-types";

import movy from "../../assets/movy.svg";
import chevronDown from "../../assets/chevronDown.svg";
import search from "../../assets/search.svg";
import UserImg from "./UserImg";

const links = [
  { name: "Home", url: "/" },
  { name: "Movies", url: "/" },
  { name: "Series", url: "/" },
  { name: "Recently Added", url: "/" },
  { name: "My List", url: "/" },
];

function NavBar({ open, setOpen }) {
  return (
    <div className="flex ml-6 mr-6 xl:ml-32 xl:mr-20 pt-14 justify-between">
      <div className="flex">
        <div className="">
          <img src={movy} alt="search" />
        </div>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="text-3xl absolute left-36 top-16 cursor-pointer md:hidden"
        >
          <ion-icon name={open ? "close" : "menu"} style={{ color: "white" }} />
        </button>
        <ul
          className={`items-center ml-20 justify-around md:flex transition-all duration-500 ease-in ${
            open
              ? "top-24 md:top-12 absolute md:static rounded-md bg-gray-400 bg-opacity-50 md:bg-inherit md:ml-20 ml-32"
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
              <a
                href={link.url}
                className="text-white text-lg font-sfProDisplay"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center justify-evenly w-40">
        <img src={search} alt="search" className="hover:cursor-pointer" />
        <UserImg />
        <img
          src={chevronDown}
          alt="chevronDown"
          className="hover:cursor-pointer"
        />
      </div>
    </div>
  );
}

NavBar.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

export default NavBar;
