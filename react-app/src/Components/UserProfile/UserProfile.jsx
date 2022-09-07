import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import movy from "../../assets/movy.svg";
import profile from "../../assets/profile.svg";

import { selectors, userActions } from "../../store/slices/user";

const languages = ["English", "Español"];
const parentControl = ["All maturity levels", "Child content"];

function UserProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(selectors.getUser);

  const [name, setName] = useState(user.name);
  const [errorName, setErrorName] = useState(false);
  const [kid, setKid] = useState(user.includeAdult);
  const [selectedLanguage, setSelectedLanguage] = useState(user.selectedLanguage || "English");
  const [includeAdult, setIncludeAdult] = useState(!user.includeAdult ? "All maturity levels" : "Child content");

  const onChangeNameHandler = (e) => {
    setName(e.target.value);
    setErrorName(false);
  };

  const onChangeKidHandler = (e) => {
    setKid(e.target.checked);
    setIncludeAdult(e.target.checked ? "Child content" : "All maturity levels");
  };

  const onChangeLanguageHandler = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const onChangeIncludeAdultHandler = (e) => {
    setIncludeAdult(e.target.value);
    setKid(e.target.value === "Child content");
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (!name || name.trim().length === 0) {
      setErrorName(true);
      return;
    }

    const userProfile = {
      username: "username",
      name,
      language: selectedLanguage,
      include_adult: kid,
    };

    localStorage.setItem("userProfile", JSON.stringify(userProfile));

    dispatch(
      userActions.setUser({
        ...user,
        name,
        selectedLanguage,
        includeAdult: kid,
      }),
    );

    navigate("/");
  };

  return (
    <div className="w-screen h-screen bg-[#111111]">
      <form onSubmit={onSubmitHandler}>
        <nav className="flex items-center sm:ml-24 ml-2 sm:mr-14 mr-2 sm:pt-10 pt-6">
          <img src={movy} alt="Movy Logo" />
        </nav>
        <div className="mt-20 mx-auto sm:w-8/12 w-11/12">
          <p className="text-white sm:text-5xl text-4xl border-b border-[#979797] pb-5">
            Edit Profile
          </p>
          <div className="flex sm:flex-row flex-col mt-10 border-b border-[#979797] pb-10">
            <div className="bg-white max-h-[165px] max-w-[165px] flex-shrink-0 self-center sm:self-start mb-10 sm:mb-0">
              <img
                src={
                  user.avatar ? `https://image.tmdb.org/t/p/w200/${user.avatar}` : profile
                }
                alt="Profile"
              />
            </div>
            <div className="sm:ml-14 mx-auto flex-grow">
              <div className="flex 2lg:flex-row flex-col 2lg:items-center items-start">
                <input
                  value={name}
                  onChange={onChangeNameHandler}
                  type="text"
                  className={`border ${
                    errorName ? "border-red-600" : "border-[#0578FF]"
                  } bg-black rounded-sm h-[41px] max-w-[427px] w-full text-white text-2xl pl-4`}
                />
                <div className="2lg:mt-0 mt-3 flex items-center">
                  <input
                    checked={kid}
                    onChange={onChangeKidHandler}
                    type="checkbox"
                    className="border border-[#0578FF] w-6 h-6 2lg:ml-10 ml-0 bg-black"
                  />
                  <p className="text-white text-2xl inline ml-5">Kid ?</p>
                </div>
              </div>
              <p className="text-white text-2xl mt-4">Language:</p>
              <select
                value={selectedLanguage}
                onChange={onChangeLanguageHandler}
                className="border border-[#0578FF] bg-black text-white text-lg h-[41px] max-w-[124px] w-full px-2 mt-2"
              >
                {languages.map((language) => {
                  return (
                    <option key={language} value={language}>
                      {language}
                    </option>
                  );
                })}
              </select>
              <p className="text-white text-2xl mt-4">
                Allowed TV shows and movies:
              </p>
              <select
                value={includeAdult}
                onChange={onChangeIncludeAdultHandler}
                className="border border-[#0578FF] bg-black text-white h-[41px] max-w-[285px] w-full px-2 mt-2 text-lg"
              >
                {parentControl.map((control) => {
                  return (
                    <option key={control} value={control}>
                      {control}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="flex gap-4 mt-8 sm:flex-row flex-col">
            <button
              type="submit"
              className="rounded-sm bg-[#0578FF] hover:bg-[#2389fe] text-white text-base py-2 px-10"
            >
              SAVE
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="rounded-sm border border-[#0578FF] hover:bg-[#292424f2] text-white text-base py-2 px-10"
            >
              CANCEL
            </button>
            <button
              type="button"
              className="rounded-sm border border-[#0578FF] hover:bg-[#292424f2] text-white text-base py-2 px-10"
            >
              DELETE PROFILE
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UserProfile;
