import React from "react";
import ChevronDown from "./ChevronDown";
import SearchIcon from "./SearchIcon";
import UserImg from "./UserImg";

const links = [
  { name: "Home", url: "/" },
  { name: "Movies", url: "/" },
  { name: "Series", url: "/" },
  { name: "Recently Added", url: "/" },
  { name: "My List", url: "/" },
];

function NavBar() {
  return (
    <div className="flex ml-6 mr-6 xl:ml-32 xl:mr-20 pt-24 justify-between bg-red-400">
      <div className="flex bg-green-400">
        <div className="text-white text-4xl font-semibold relative after:content-[''] after:inline-block after:h-2.5 after:w-2.5 after:rounded-full after:bg-blue-700 after:text-6xl after:relative after:bottom-6 after:right-3 bg-blue-500">
          Movy
        </div>
        <ul className="flex items-center ml-20 justify-around bg-yellow-300">
          {links.map((link) => (
            <li key={link.name} className="bg-orange-400">
              <a
                href={link.url}
                className="text-white font-serif text-xl ml-10"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center justify-evenly bg-purple-500">
        <SearchIcon />
        <UserImg />
        <ChevronDown />
      </div>
    </div>
  );
}

export default NavBar;
