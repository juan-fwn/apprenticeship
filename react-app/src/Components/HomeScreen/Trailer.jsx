import React from "react";
import PropTypes from "prop-types";
import styles from "./Trailer.module.css";

import Background from "../UI/Background";
import { ReactComponent as AddFavorite } from "../../assets/addFavorite.svg";

function Trailer({ serieBgImage }) {
  return (
    <>
      <Background serieBgImage={serieBgImage} />
      <div className="p-16 flex">
        <div className="w-7/12 inline-block">ASD</div>
        <div className="w-5/12 inline-block pt-6 self-center">
          <div className="flex justify-between">
            <p className="font-semibold text-4xl text-[#aba2a2]">Movy</p>
            <div className="border rounded-3xl border-[#aba2a2] text-sm w-20 h-8 flex justify-center items-center text-[#aba2a2] font-semibold sm:self-end self-start sm:mt-0 mt-4">
              PG 13
            </div>
          </div>
          <p className="text-white font-semibold pt-7 text-6xl">The Matrix</p>
          <button type="button" className={styles.button}>
            <div className="sm:ml-0 mx-auto sm:mr-4 sm:mt-0 mt-7 sm:mb-0 mb-3">
              <AddFavorite fill="#92AAD7" />
            </div>
            <div className="text-[#92AAD7] text-lg self-center">
              Watch Later
            </div>
          </button>
        </div>
      </div>
    </>
  );
}

Trailer.propTypes = {
  serieBgImage: PropTypes.string.isRequired,
};

export default Trailer;
