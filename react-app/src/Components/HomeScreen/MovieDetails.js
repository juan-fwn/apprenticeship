import React from "react";
import PropTypes from "prop-types";

import centerDot from "../../assets/icons/centerDot.svg";
import directorLogo from "../../assets/icons/directorLogo.svg";
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
        <p className="w-3/4 sm:text-5xl text-4xl font-bold text-white">
          BLACK MIRROR
        </p>
        <div className="border rounded-3xl border-white sm:text-xl text-base sm:w-24 w-20 h-8 flex justify-center items-center text-white font-semibold sm:self-end self-start sm:mt-0 mt-4">
          PG 13
        </div>
      </div>
      <div className="mt-10 flex flex-col sm:flex-row">
        <div className="bg-pink-600 border border-pink-600 rounded-lg w-16 h-8 flex justify-center items-center text-white sm:text-lg text-sm self-center">
          2:30h
        </div>
        <div className="sm:ml-14 mx-auto sm:mr-4 sm:mt-0 mt-7 sm:mb-0 mb-3">
          <img src={directorLogo} alt="director-logo" />
        </div>
        <div className="text-white font-semibold text-lg self-center">
          Quentin Tarantino
        </div>
        <div className="sm:ml-14 mx-auto sm:mt-0 mt-7 sm:mb-0 mb-3 self-center flex justify-center">
          <StarRate />
        </div>
      </div>
      <p className="text-white mt-10 sm:w-3/4 w-auto sm:text-base text-sm">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non
        risus aliquet, imperdiet dolor sit amet, malesuada lectus. Aenean ac
        sapien non dui efficitur fermentum. Vestibulum ante ipsum primis in
        faucibus orci luctus et ultrices posuere cubilia curae; Quisque ac
        laoreet sem. Aenean a ipsum vehicula, mattis dui sit amet, pulvinar
        augue. Vivamus elementum maximus mi et lacinia. Cras non efficitur
        lorem, sed ornare metus. Quisque scelerisque risus orci, sit amet porta
        nisi cursus vel. Nulla posuere, risus quis scelerisque convallis, orci
        ipsum iaculis odio, eu vestibulum urna lorem non justo. In hac habitasse
        platea dictumst. Maecenas dignissim purus in risus iaculis, sit amet
        congue mi maximus.
      </p>
    </div>
  );
}

MovieDetails.propTypes = {
  openNav: PropTypes.bool.isRequired,
};

export default MovieDetails;
