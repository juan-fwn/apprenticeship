import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import styles from "./RecommendedMovie.module.css";

import cross from "../../../assets/cross.svg";
import { ReactComponent as AddFavorite } from "../../../assets/addFavorite.svg";
import { ReactComponent as Share } from "../../../assets/share.svg";
import watchTrailer from "../../../assets/watchTrailer.svg";

import Background from "../../UI/Background/Background";
import StarRate from "../../UI/StarRate";

import { selectors as configSelectors } from "../../../store/slices/configuration";
import { selectors } from "../../../store/slices/movies";

const navBar = [
  { id: 0, name: "OVERVIEW" },
  { id: 1, name: "MORE LIKE THIS" },
  { id: 2, name: "DETAILS" },
];

function RecommendedMovie({ selectedMovie, setSelectedMovie }) {
  const [selectedNav, setSelectedNav] = useState(0);

  const imageSettings = useSelector(configSelectors.getImageSettings);
  const {
    secure_base_url: secureBaseUrl = "",
    backdrop_sizes: backdropSizes = [],
  } = imageSettings;

  const serieBgImage = `${secureBaseUrl}${
    backdropSizes ? backdropSizes.at(-1) : "original"
  }${selectedMovie?.backdrop_path}`;

  const genres = useSelector(selectors.getGenres);

  const genreList = selectedMovie?.genre_ids
    ?.filter((id) => genres.some((genre) => genre.id === id))
    .map((genreId) => genres.find((genre) => genre.id === genreId)?.name);

  const genrePlainText = genreList?.join(" • ");

  const clearSelectedMovie = () => {
    setSelectedMovie(null);
  };

  const onClickNavHandler = (value) => {
    setSelectedNav(value);
  };

  console.log({ selectedNav });

  return (
    <>
      <Background serieBgImage={serieBgImage} type="recommended-movie" />
      <div className={styles["recommended-movie"]}>
        <button
          type="button"
          onClick={clearSelectedMovie}
          className="block ml-auto"
        >
          <img src={cross} alt="Exit" />
        </button>
        <p className="text-white text-4xl mt-5">
          A
          <span className="font-semibold">Movy</span>
          Film
        </p>
        <p className="text-white text-5xl font-semibold mt-5">
          {selectedMovie?.original_title?.length > 0
            ? selectedMovie?.original_title
            : selectedMovie?.name}
        </p>
        <div className="mt-10 flex items-center">
          <StarRate rate={9} size="normal" />
          <div className="ml-6 border rounded-3xl border-white sm:text-lg text-base w-20 h-8 flex justify-center items-center text-white font-semibold sm:self-end self-start sm:mt-0 mt-4">
            PG 13
          </div>
        </div>
        <p className={styles["cut-text"]}>{selectedMovie?.overview}</p>
        <div className="flex items-center flex-col sm:flex-row mt-16">
          <div className="sm:ml-0 mx-auto sm:mr-4 sm:mt-0 mt-7 sm:mb-0 mb-3">
            <img src={watchTrailer} alt="watch-trailer" />
          </div>
          <div className="text-[#92AAD7] text-lg self-center">
            Watch Trailer
          </div>
          <div className="sm:ml-14 mx-auto sm:mr-3 sm:mt-0 mt-7 sm:mb-0 mb-3">
            <AddFavorite fill="#92AAD7" />
          </div>
          <div className="text-[#92AAD7] text-lg self-center">Watch Later</div>
          <div className="sm:ml-14 mx-auto sm:mr-3 sm:mt-0 mt-7 sm:mb-0 mb-3">
            <Share fill="#92AAD7" />
          </div>
          <div className="text-[#92AAD7] text-lg self-center">Share</div>
        </div>
        <p className="text-white text-xl mt-16">
          {genrePlainText?.length > 0 ? genrePlainText : ""}
        </p>
        <nav className="flex justify-center items-center font-semibold text-white gap-20 mt-20">
          {navBar.map((option) => {
            return (
              <button
                key={option?.id?.toString()}
                type="button"
                value={option.id}
                onClick={onClickNavHandler.bind(this, option?.id)}
                className={`${
                  selectedNav === option.id
                    ? styles["selected-nav"]
                    : "relative"
                }`}
              >
                {option?.name}
              </button>
            );
          })}
        </nav>
      </div>
    </>
  );
}

RecommendedMovie.propTypes = {
  selectedMovie: PropTypes.objectOf(PropTypes.any).isRequired,
  setSelectedMovie: PropTypes.func.isRequired,
};

export default RecommendedMovie;
