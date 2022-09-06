import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import chevronDown from "../../../assets/chevronDown.svg";
import search from "../../../assets/search.svg";
import { selectors } from "../../../store/slices/user";

function UserMenu() {
  const navigate = useNavigate();

  const user = useSelector(selectors.getUser);
  const [open, setOpen] = useState(false);

  const deleteCookie = (name) => {
    document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  };

  const logOutHandler = () => {
    deleteCookie("session_id");
    navigate(`/`);
  };

  return (
    <div className="flex items-center justify-evenly w-40">
      <img src={search} alt="search" className="hover:cursor-pointer" />
      <Link to="/profile">
        <img
          className="rounded-full h-10 w-10 border-2 border-blue-700 object-cover"
          src={`${
            user?.avatar
              ? `https://image.tmdb.org/t/p/w200/${user.avatar}`
              : "https://www.telesurtv.net/__export/1526430884051/sites/telesur/img/multimedia/2018/05/15/incognito.jpg"
          }`}
          alt="User"
        />
      </Link>
      <button
        type="button"
        className="relative"
        onClick={() => setOpen((prevState) => !prevState)}
      >
        <img
          src={chevronDown}
          alt="chevronDown"
          className="hover:cursor-pointer"
        />
      </button>
      {open && (
        <ul className="items-center justify-around bg-gray-400 rounded-md absolute top-24 xl:right-16 right-11 bg-opacity-50">
          <li className="hover:bg-gray-300 hover:bg-opacity-50 py-2 px-4 rounded-md">
            <button
              onClick={() => navigate("/profile")}
              type="button"
              className="text-white text-lg"
            >
              Profile
            </button>
          </li>
          <li className="hover:bg-gray-300 hover:bg-opacity-50 py-2 px-4 rounded-md">
            <button
              onClick={logOutHandler}
              type="button"
              className="text-white text-lg"
            >
              Log Out
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default UserMenu;
