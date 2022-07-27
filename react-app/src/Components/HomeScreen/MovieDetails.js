import React from "react";

import Video from "../UI/Video";
import CenterDot from "../UI/CenterDot";

function MovieDetails() {
  return (
    <div className="mx-16 mt-24 md:mx-36 lg:mx-64">
      <div className="flex">
        <p className="text-white mr-2">2019</p>
        <div className="relative top-2.5">
          <CenterDot />
        </div>
        <p className="text-white ml-2">Action, Thriller</p>
      </div>
      <div className="flex justify-between mt-8">
        <p className="w-3/4 text-5xl font-bold text-white">
          BLACK MIRROR
        </p>
        <div className="border rounded-3xl border-white text-xl w-24 h-8 flex justify-center items-center text-white font-semibold self-end">
          PG 13
        </div>
      </div>
      <div className="mt-10 flex">
        <div className="bg-pink-600 border border-pink-600 rounded-lg w-16 h-8 flex justify-center items-center text-white text-lg self-center">
          2:30h
        </div>
        <div className="ml-14">
          <Video />
        </div>
        <div className="text-white font-semibold text-lg self-center ml-2">
          Quentin Tarantino
        </div>
      </div>
      <p className="text-white mt-10">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam non
        risus aliquet, imperdiet dolor sit amet, malesuada lectus. Aenean ac
        sapien non dui efficitur fermentum. Vestibulum ante ipsum primis in
        faucibus orci luctus et ultrices posuere cubilia curae; Quisque ac
        laoreet sem. Aenean a ipsum vehicula, mattis dui sit amet, pulvinar
        augue. Vivamus elementum maximus mi et lacinia. Cras non efficitur
        lorem, sed ornare metus. Quisque scelerisque risus orci, sit amet porta
        nisi cursus vel. Nulla posuere, risus quis scelerisque convallis, orci
        ipsum iaculis odio, eu vestibulum urna lorem non justo. In hac habitasse
        platea dictumst. Maecenas dignissim purus in risus iaculis, sit amet
        congue mi maximus.
      </p>
    </div>
  );
}

export default MovieDetails;
