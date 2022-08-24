import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";

import useRequest from "../../../hooks/useRequest";
import { moviesActions, selectors } from "../../../store/slices/movies";

import Spinner from "../../UI/Spinner";

function Details({ selectedMovie }) {
  const dispatch = useDispatch();

  const genres = useSelector(selectors.getGenres);

  const genreList = selectedMovie?.genre_ids
    ?.filter((id) => genres.some((genre) => genre.id === id))
    .map((genreId) => genres.find((genre) => genre.id === genreId)?.name);

  const movieCrew = useSelector(selectors.getMovieCrew);
  const movieCast = useSelector(selectors.getMovieCast).slice(1, 6);

  const movieDirector = movieCrew.find((crew) => crew.job === "Director")?.name;

  const { error, isLoading, sendRequest } = useRequest();

  useEffect(() => {
    const requestConfig = {
      path: `/movie/${selectedMovie.id}/credits`,
    };

    const getMovieCredits = (json) => {
      dispatch(moviesActions.setMovieCredits(json));
    };

    sendRequest(requestConfig, getMovieCredits);
  }, [selectedMovie]);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center mt-14">
          <Spinner size="medium" />
        </div>
      ) : (
        <>
          {error ? (
            <p className="rounded-lg bg-gray-400 text-red-600 mt-14 flex justify-center items-center p-4">
              Error! Couldn&apos;t find movie details
            </p>
          ) : (
            <>
              <div className="flex flex-row mt-14 w-full justify-between">
                <div className="flex flex-col">
                  <p className="text-[#D4D4D4]">Creator</p>
                  <p className="text-white mt-4">{movieDirector || "Not found"}</p>
                </div>
                <div className="flex flex-col">
                  <p className="text-[#D4D4D4] mb-4">Genres</p>
                  {genreList?.map((genre) => {
                    return (
                      <p key={genre} className="text-white">
                        {genre}
                      </p>
                    );
                  })}
                </div>
                <div className="flex flex-col">
                  <p className="text-[#D4D4D4]">Maturity Ratings</p>
                  <div className="border rounded-3xl border-[#0cb0ff] bg-[#0cb0ff] text-xs w-16 h-7 flex justify-center items-center text-white font-semibold mt-6">
                    PG 13
                  </div>
                  <p className="text-white mt-6">
                    Recommended for ages 16 and up
                  </p>
                </div>
              </div>
              <div>
                <p className="text-[#D4D4D4] mb-4">Cast</p>
                {movieCast?.map((person) => {
                  return (
                    <p key={person.name} className="text-white">
                      {person.name}
                    </p>
                  );
                })}
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

Details.propTypes = {
  selectedMovie: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Details;
