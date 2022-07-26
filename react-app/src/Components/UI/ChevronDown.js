import React from "react";

function ChevronDown() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="ml-4"
      width="26"
      height="26"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="#ffffff"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export default ChevronDown;
