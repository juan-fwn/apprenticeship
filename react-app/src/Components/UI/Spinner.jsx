import React from "react";

import styles from "./Spinner.module.css";

function Spinner() {
  console.log("Rendering Spinner");
  return (
    <div className="w-screen h-screen bg-[rgba(0,0,0,0.7)] flex justify-center items-center">
      <span className={styles.loader} />
    </div>
  );
}

export default Spinner;
