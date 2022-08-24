import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import useRequest from "../../../hooks/useRequest";
import { moviesActions, selectors } from "../../../store/slices/movies";

import MovieList from "../MovieList";
import Spinner from "../../UI/Spinner";

function MoreLikeThis({ selectedMovie, secureBaseUrl, backdropSizes }) {
  const dispatch = useDispatch();

  const similarMovies = useSelector(selectors.getSimilarMovies);

  const { isLoading, sendRequest } = useRequest();

  useEffect(() => {
    const requestConfig = {
      path: `/movie/${selectedMovie.id}/similar`,
    };

    const getSimilarMovies = (json) => {
      dispatch(moviesActions.setSimilarMovies(json.results));
    };

    sendRequest(requestConfig, getSimilarMovies);
  }, [selectedMovie]);

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center mt-20">
          <Spinner size="medium" />
        </div>
      ) : (
        <div className="mt-4">
          <MovieList
            listName=""
            movies={similarMovies}
            baseUrl={secureBaseUrl}
            backdropSizes={backdropSizes}
          />
        </div>
      )}
    </>
  );
}

MoreLikeThis.propTypes = {
  selectedMovie: PropTypes.objectOf(PropTypes.any).isRequired,
  secureBaseUrl: PropTypes.string.isRequired,
  backdropSizes: PropTypes.string.isRequired,
};

export default MoreLikeThis;
