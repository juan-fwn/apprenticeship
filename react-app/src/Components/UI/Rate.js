import React, { useState } from "react";

const posibleRates = [1, 2, 3, 4, 5];

function Rate() {
  const [selectedRate, setSelectedRate] = useState(null);
  const [hoveredRate, setHoveredRate] = useState(null);

  return (
    <div>
        {/* {posibleRates.map(rate => return (
            <i key={rate?.toString()} className="fas fa-star" onClick={() => setSelectedRate()}></i>
        ))} */}
        span
    </div>
  )
}

export default Rate;
