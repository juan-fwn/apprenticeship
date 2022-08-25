import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import styles from "./RecommendedMovie.module.css";

import cross from "../../../assets/cross.svg";
import Background from "../../UI/Background/Background";
import Overview from "./Overview";
import MoreLikeThis from "./MoreLikeThis";
import Details from "./Details";

import { selectors as configSelectors } from "../../../store/slices/configuration";
import { selectors } from "../../../store/slices/movies";

import { RECOMMENDED_MOVIE_NAVBAR } from "../../../constants";

const navBar = Object.keys(RECOMMENDED_MOVIE_NAVBAR);

console.log({ navBar });

function RecommendedMovie({ selectedMovie, setSelectedMovie }) {
  const [selectedNav, setSelectedNav] = useState(
    RECOMMENDED_MOVIE_NAVBAR.OVERVIEW,
  );

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

  const getSectionContent = (navOption) => {
    switch (navOption) {
      case RECOMMENDED_MOVIE_NAVBAR.OVERVIEW:
        return (
          <Overview selectedMovie={selectedMovie} genre={genrePlainText} />
        );
      case RECOMMENDED_MOVIE_NAVBAR.MORE_LIKE_THIS:
        return (
          <MoreLikeThis
            selectedMovie={selectedMovie}
            secureBaseUrl={secureBaseUrl}
            backdropSizes={backdropSizes}
          />
        );
      case RECOMMENDED_MOVIE_NAVBAR.DETAILS:
        return <Details selectedMovie={selectedMovie} />;
      default:
        return (
          <Overview selectedMovie={selectedMovie} genre={genrePlainText} />
        );
    }
  };

  return (
    <>
      <Background serieBgImage={serieBgImage} type="recommended-movie" />
      <div className={styles["recommended-movie"]}>
        <button
          type="button"
          onClick={() => setSelectedMovie(null)}
          className="block ml-auto"
        >
          <img src={cross} alt="Exit" />
        </button>
        <p className="text-white text-4xl mt-5">
          A&nbsp;
          <span className="font-semibold">Movy&nbsp;</span>
          Film
        </p>
        <p className="text-white text-5xl font-semibold mt-5">
          {selectedMovie?.original_title?.length > 0
            ? selectedMovie?.original_title
            : selectedMovie?.name}
        </p>
        {getSectionContent(selectedNav)}
        <nav className="flex sm:flex-row flex-col justify-center items-center font-semibold text-white sm:gap-20 gap-10 mt-20">
          {navBar.map((option) => {
            return (
              <button
                key={option}
                type="button"
                value={option}
                onClick={() => setSelectedNav(RECOMMENDED_MOVIE_NAVBAR[option])}
                className={`${
                  selectedNav === RECOMMENDED_MOVIE_NAVBAR[option]
                    ? styles["selected-nav"]
                    : "relative"
                }`}
              >
                {option}
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
