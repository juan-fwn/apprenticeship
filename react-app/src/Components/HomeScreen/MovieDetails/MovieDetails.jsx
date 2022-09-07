import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import styles from "./MovieDetails.module.css";

import centerDot from "../../../assets/centerDot.svg";
import directorLogo from "../../../assets/directorLogo.svg";
import { ReactComponent as AddFavorite } from "../../../assets/addFavorite.svg";
import watchTrailer from "../../../assets/watchTrailer.svg";
import imbd from "../../../assets/imbd.svg";
import volume from "../../../assets/volume.svg";
import StarRate from "../../UI/StarRate";

import { selectors } from "../../../store/slices/movies";
import { addFavoriteMovie, addAlreadySawTrailers } from "../../../store/actions/movies";
import useRequest from "../../../hooks/useRequest";

function MovieDetails({ openNav, selectedMovie }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { sendRequest } = useRequest();

  const genres = useSelector(selectors.getGenres);

  const movieYear = new Date(
    selectedMovie?.release_date || selectedMovie?.first_air_date,
  ).getFullYear();

  const genreList = selectedMovie?.genre_ids
    ?.filter((id) => genres.some((genre) => genre.id === id))
    .map((genreId) => genres.find((genre) => genre.id === genreId)?.name);

  const genrePlainText = genreList?.join(", ");

  const onClickWatchLaterHandler = () => {
    dispatch(addFavoriteMovie(sendRequest, selectedMovie));
  };

  const onClickWatchTrailerHandler = () => {
    dispatch(addAlreadySawTrailers(selectedMovie));
    navigate(`/trailer/${selectedMovie.id}`);
  };

  return (
    <div
      className={`mx-16 md:mx-36 xl:mx-64 ${
        openNav ? "md:mt-24 mt-60" : "mt-24"
      } transition-all duration-200 ease-in`}
    >
      <div className="flex">
        <p className="text-white mr-2">{movieYear}</p>
        <div className="relative top-2.5">
          <img src={centerDot} alt="center-dot" />
        </div>
        <div className="ml-2">
          <p className="text-white">{genrePlainText}</p>
        </div>
      </div>
      <div className="flex justify-between mt-8 flex-col sm:flex-row">
        <p className="w-3/4 sm:text-5xl text-4xl font-bold text-white">
          {selectedMovie?.title?.length > 0
            ? selectedMovie.title
            : selectedMovie.name}
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
        <div className="text-white text-lg self-center">Quentin Tarantino</div>
        <div className="sm:ml-14 mx-auto sm:mt-0 mt-7 sm:mb-0 mb-3 self-center flex justify-center">
          <StarRate rate={selectedMovie?.vote_average || 0} size="normal" />
        </div>
      </div>
      <p
        className={`text-white mt-10 sm:w-3/4 w-auto sm:text-base text-sm ${styles["limit-lines"]}`}
      >
        {selectedMovie?.overview}
      </p>
      <div className="flex sm:flex-row flex-col sm:justify-between mt-8 sm:mt-28">
        <div className="flex items-center flex-col sm:flex-row">
          <button
            type="button"
            className="flex sm:flex-row flex-col items-center"
            onClick={onClickWatchLaterHandler}
          >
            <div className="sm:ml-0 mx-auto sm:mr-4 sm:mt-0 mt-7 sm:mb-0 mb-3">
              <AddFavorite fill="#92AAD7" />
            </div>
            <div className="text-[#92AAD7] text-lg self-center">
              Watch Later
            </div>
          </button>
          <button
            type="button"
            onClick={onClickWatchTrailerHandler}
            className="flex sm:flex-row flex-col items-center sm:ml-14"
          >
            <div className="mx-auto sm:mr-3 sm:mt-0 mt-7 sm:mb-0 mb-3">
              <img src={watchTrailer} alt="watch-trailer" />
            </div>
            <div className="text-[#92AAD7] text-lg self-center">
              Watch Trailer
            </div>
          </button>
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
  selectedMovie: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default MovieDetails;
