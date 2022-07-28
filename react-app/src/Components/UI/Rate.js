import React, { useState } from "react";

const posibleRates = [1, 2, 3, 4, 5];

function Rate() {
  const [selectedRate, setSelectedRate] = useState(null);
  const [hoveredRate, setHoveredRate] = useState(null);

  return (
    <>
      {posibleRates.map((rate) => (
        <button
          type="button"
          aria-label="Star"
          key={rate?.toString()}
          className={`ml-1 fas fa-star ${rate <= selectedRate && "in-rate"} ${
            rate <= hoveredRate && "in-hover"
          }`}
          onClick={() => setSelectedRate(rate)}
          onMouseEnter={() => setHoveredRate(rate)}
          onMouseLeave={() => setHoveredRate(null)}
        />
      ))}
    </>
  );
}

export default Rate;
