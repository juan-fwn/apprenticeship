import React from "react";

import Video from "../UI/Video";

function MovieDetails() {
  return (
    <div className="bg-yellow-700 mx-64 mt-40">
      <p className="text-white">2019 ● Action, Thriller</p>
      <div className="bg-yellow-300 flex justify-between mt-8">
        <p className="w-3/4 bg-cyan-400 text-7xl font-bold text-white">
          BLACK MIRROR
        </p>
        <div className="border rounded-3xl border-white text-2xl w-28 h-12 flex justify-center items-center text-white font-semibold self-end">
          PG 13
        </div>
      </div>
      <div className="mt-10 flex bg-green-400">
        <div className="bg-pink-600 border border-pink-600 rounded-lg w-16 h-8 flex justify-center items-center font-semibold text-white text-lg self-center">
          2:30h
        </div>
        <div className="ml-14">
          <Video />
        </div>
        <div className="text-white font-semibold text-lg self-center ml-2">
          Quentin Tarantino
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
