import React from "react";
import PropTypes from "prop-types";

import star from "../../assets/star.svg";
import halfStar from "../../assets/halfStar.svg";

function StarRate({ rate, size }) {
  const starRate = rate / 2;
  const fullStars = Math.floor(starRate);

  const starsArray = [];
  for (let i = 1; i <= fullStars; i += 1) {
    starsArray.push(i);
  }

  const lastStar = starRate % 1 >= 0.25;

  function getLastStar() {
    return starRate % 1 >= 0.75 ? star : halfStar;
  }

  return (
    <div data-testid="StarRate" className="flex">
      {starsArray.map((fullStar) => (
        <img
          key={fullStar}
          src={star}
          alt="Star"
          className={`mr-2 ${size === "small" ? "w-3 h-3" : ""}`}
        />
      ))}
      {lastStar && (
        <img
          src={getLastStar()}
          alt="Star"
          className={`mr-2 ${size === "small" ? "w-3 h-3" : ""}`}
        />
      )}
    </div>
  );
}

StarRate.propTypes = {
  rate: PropTypes.number.isRequired,
  size: PropTypes.string.isRequired,
};

export default StarRate;
