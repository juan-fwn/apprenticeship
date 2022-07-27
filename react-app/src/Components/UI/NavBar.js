import React, { useState } from "react";
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
  const [open, setOpen] = useState(false);

  return (
    <div className="flex ml-6 mr-6 xl:ml-32 xl:mr-20 pt-14 justify-between">
      <div className="flex">
        <div className="text-white text-4xl font-semibold relative after:content-[''] after:inline-block after:h-2.5 after:w-2.5 after:rounded-full after:bg-blue-700 after:text-6xl after:relative after:bottom-6 after:right-3">
          Movy
        </div>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="text-3xl absolute left-36 top-16 cursor-pointer md:hidden"
        >
          <ion-icon name={open ? "close" : "menu"} />
        </button>
        <ul
          className={`items-center ml-20 justify-around md:z-auto z-[-10] md:flex md:pl-0 pl-9 transition-all duration-500 ease-in absolute ${
            open ? "top-20 " : "top-[-490px]"
          }`}
        >
          {links.map((link) => (
            <li key={link.name} className="">
              <a
                href={link.url}
                className="text-white font-serif text-lg ml-10"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center justify-evenly">
        <SearchIcon />
        <UserImg />
        <ChevronDown />
      </div>
    </div>
  );
}

export default NavBar;
