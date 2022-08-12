import React from "react";
import PropTypes from "prop-types";

import star from "../../assets/star.svg";
import halfStar from "../../assets/halfStar.svg";

function StarRate({ rate, size }) {
  const halfRate = rate / 2;

  return (
    <>
      {halfRate >= 1 && <img src={star} alt="Star" className={`mr-2 ${size === "small" ? "w-3 h-3" : ""}`} />}
      {halfRate > 1 && halfRate < 2 && <img src={halfStar} alt="Half Star" className={`mr-2 ${size === "small" ? "w-3 h-3" : ""}`} />}
      {halfRate >= 2 && <img src={star} alt="Star" className={`mr-2 ${size === "small" ? "w-3 h-3" : ""}`} />}
      {halfRate > 2 && halfRate < 3 && <img src={halfStar} alt="Half Star" className={`mr-2 ${size === "small" ? "w-3 h-3" : ""}`} />}
      {halfRate >= 3 && <img src={star} alt="Star" className={`mr-2 ${size === "small" ? "w-3 h-3" : ""}`} />}
      {halfRate > 3 && halfRate < 4 && <img src={halfStar} alt="Half Star" className={`mr-2 ${size === "small" ? "w-3 h-3" : ""}`} />}
      {halfRate >= 4 && <img src={star} alt="Star" className={`mr-2 ${size === "small" ? "w-3 h-3" : ""}`} />}
      {halfRate > 4 && halfRate < 5 && <img src={halfStar} alt="Half Star" className={`mr-2 ${size === "small" ? "w-3 h-3" : ""}`} />}
      {halfRate >= 5 && <img src={star} alt="Star" className={`mr-2 ${size === "small" ? "w-3 h-3" : ""}`} />}
    </>
  );
}

StarRate.propTypes = {
  rate: PropTypes.number.isRequired,
  size: PropTypes.string.isRequired,
};

export default StarRate;
