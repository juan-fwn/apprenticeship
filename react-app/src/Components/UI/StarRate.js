import React from "react";
import PropTypes from "prop-types";

import star from "../../assets/icons/star.svg";
import halfStar from "../../assets/icons/halfStar.svg";

function StarRate({ rate }) {
  return (
    <>
      <img src={star} alt={rate} className="mr-2" />
      <img src={star} alt={rate} className="mr-2" />
      <img src={star} alt={rate} className="mr-2" />
      <img src={star} alt={rate} className="mr-2" />
      <img src={halfStar} alt={rate} />
    </>
  );
}

StarRate.propTypes = {
  rate: PropTypes.number.isRequired,
};

StarRate.defautlProps = {
  rate: 5,
};

export default StarRate;
