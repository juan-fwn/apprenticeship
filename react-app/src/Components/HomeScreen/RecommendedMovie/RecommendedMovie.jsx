import React from "react";
import PropTypes from "prop-types";

import styles from "./RecommendedMovie.module.css";

import cross from "../../../assets/cross.svg";
import Background from "../../UI/Background/Background";
import StarRate from "../../UI/StarRate";

function RecommendedMovie({ serieBgImage }) {
  return (
    <>
      <Background serieBgImage={serieBgImage} type="recommended-movie" />
      <div className={styles["recommended-movie"]}>
        <img src={cross} alt="Exit" className="ml-auto" />
        <p className="text-white text-4xl mt-3">
          A
          <span className="font-semibold">Movy</span>
          Film
        </p>
        <p className="text-white text-5xl font-semibold mt-5">Avatar 2</p>
        <div className="mt-10 flex items-center">
          <StarRate rate={9} size="normal" />
          <div className="ml-6 border rounded-3xl border-white sm:text-lg text-base w-20 h-8 flex justify-center items-center text-white font-semibold sm:self-end self-start sm:mt-0 mt-4">
            PG 13
          </div>
        </div>
      </div>
    </>
  );
}

RecommendedMovie.propTypes = {
  //   movie: PropTypes.objectOf(PropTypes.any).isRequired,
  serieBgImage: PropTypes.string.isRequired,
};

export default RecommendedMovie;
