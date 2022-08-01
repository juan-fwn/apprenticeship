import React from "react";
import PropTypes from "prop-types";

import centerDot from "../../assets/centerDot.svg";
import directorLogo from "../../assets/directorLogo.svg";
import addFavorite from "../../assets/addFavorite.svg";
import watchTrailer from "../../assets/watchTrailer.svg";
import imbd from "../../assets/imbd.svg";
import volume from "../../assets/volume.svg";
import StarRate from "../UI/StarRate";

function MovieDetails({ openNav }) {
  return (
    <div
      className={`mx-16 md:mx-36 xl:mx-64 ${
        openNav ? "md:mt-24 mt-60" : "mt-24"
      } transition-all duration-200 ease-in`}
    >
      <div className="flex">
        <p className="text-white mr-2">2019</p>
        <div className="relative top-2.5">
          <img src={centerDot} alt="center-dot" />
        </div>
        <p className="text-white ml-2">Action, Thriller</p>
      </div>
      <div className="flex justify-between mt-8 flex-col sm:flex-row">
        <p className="w-3/4 sm:text-5xl text-4xl font-bold text-white font-sfProDisplay">
          BLACK MIRROR
        </p>
        <div className="border rounded-3xl border-white sm:text-xl text-base sm:w-24 w-20 h-8 flex justify-center items-center text-white font-semibold sm:self-end self-start sm:mt-0 mt-4">
          PG 13
        </div>
      </div>
      <div className="mt-10 flex flex-col sm:flex-row">
        <div className="bg-[#FF056C] border border-[#FF056C] rounded-lg w-16 h-8 flex justify-center items-center text-white sm:text-lg text-sm self-center">
          2:30h
        </div>
        <div className="sm:ml-14 mx-auto sm:mr-4 sm:mt-0 mt-7 sm:mb-0 mb-3">
          <img src={directorLogo} alt="director-logo" />
        </div>
        <div className="text-white text-lg self-center font-sfProDisplay">
          Quentin Tarantino
        </div>
        <div className="sm:ml-14 mx-auto sm:mt-0 mt-7 sm:mb-0 mb-3 self-center flex justify-center">
          <StarRate />
        </div>
      </div>
      <p className="text-white mt-10 sm:w-3/4 w-auto sm:text-base text-sm font-sfProDisplay">
        Set in a world only minutes from our own, &quot;Black Mirror&quot;
        unveils how modern technologies can backfire and be used against their
        makers, every episode set in a slightly different reality with different
        characters combating different types of technologies.
      </p>
      <div className="flex sm:flex-row flex-col sm:justify-between mt-8 sm:mt-28">
        <div className="flex items-center flex-col sm:flex-row">
          <div className="sm:ml-0 mx-auto sm:mr-4 sm:mt-0 mt-7 sm:mb-0 mb-3">
            <img src={addFavorite} alt="add-favorite" />
          </div>
          <div className="text-[#92AAD7] text-lg self-center font-sfProDisplay">
            Watch Later
          </div>
          <div className="sm:ml-14 mx-auto sm:mr-3 sm:mt-0 mt-7 sm:mb-0 mb-3">
            <img src={watchTrailer} alt="watch-trailer" />
          </div>
          <div className="text-[#92AAD7] text-lg self-center font-sfProDisplay">
            Watch Trailer
          </div>
          <div className="sm:ml-14 mx-auto sm:mr-3 sm:mt-0 mt-7 sm:mb-0 mb-3">
            <img src={imbd} alt="imbd" />
          </div>
        </div>
        <div className="self-center sm:mt-0 mt-7">
          <img src={volume} alt="volume" />
        </div>
      </div>
    </div>
  );
}

MovieDetails.propTypes = {
  openNav: PropTypes.bool.isRequired,
};

export default MovieDetails;
