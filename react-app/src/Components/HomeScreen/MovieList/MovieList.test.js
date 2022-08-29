import React from "react";
import { Provider } from "react-redux";
import store from "../../../store";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import MovieList from "./MovieList";

const movies = [
  {
    adult: false,
    backdrop_path: "/hYZ4a0JvPETdfgJJ9ZzyFufq8KQ.jpg",
    genre_ids: [28, 18, 878, 14],
    id: 629176,
    media_type: "movie",
    original_language: "en",
    original_title: "Samaritan",
    overview:
      "Thirteen year old Sam Cleary  suspects that his mysteriously reclusive neighbor Mr. Smith is actually the legendary vigilante Samaritan, who was reported dead 20 years ago. With crime on the rise and the city on the brink of chaos, Sam makes it his mission to coax his neighbor out of hiding to save the city from ruin.",
    popularity: 686.637,
    poster_path: "/zgH8Ej50n2cvJCMJrxd4twEwSqz.jpg",
    release_date: "2022-08-25",
    title: "Samaritan",
    video: false,
    vote_average: 6.722,
    vote_count: 270,
  },
  {
    adult: false,
    backdrop_path: "/9n5e1vToDVnqz3hW10Jdlvmzpo0.jpg",
    genre_ids: [28, 18],
    id: 361743,
    media_type: "movie",
    original_language: "en",
    original_title: "Top Gun: Maverick",
    overview:
      "After more than thirty years of service as one of the Navy’s top aviators, and dodging the advancement in rank that would ground him, Pete “Maverick” Mitchell finds himself training a detachment of TOP GUN graduates for a specialized mission the likes of which no living pilot has ever seen.",
    popularity: 4724.785,
    poster_path: "/62HCnUTziyWcpDaBO2i1DX17ljH.jpg",
    release_date: "2022-05-24",
    title: "Top Gun: Maverick",
    video: false,
    vote_average: 8.4,
    vote_count: 3000,
  },
  {
    adult: false,
    backdrop_path: "/Aa9TLpNpBMyRkD8sPJ7ACKLjt0l.jpg",
    first_air_date: "2022-08-21",
    genre_ids: [18, 10759, 10765],
    id: 94997,
    media_type: "tv",
    name: "House of the Dragon",
    origin_country: ["US"],
    original_language: "en",
    original_name: "House of the Dragon",
    overview:
      "The prequel series finds the Targaryen dynasty at the absolute apex of its power, with more than 15 dragons under their yoke. Most empires—real and imagined—crumble from such heights. In the case of the Targaryens, their slow fall begins almost 193 years before the events of Game of Thrones, when King Viserys Targaryen breaks with a century of tradition by naming his daughter Rhaenyra heir to the Iron Throne. But when Viserys later fathers a son, the court is shocked when Rhaenyra retains her status as his heir, and seeds of division sow friction across the realm.",
    popularity: 7964.892,
    poster_path: "/z2yahl2uefxDCl0nogcRBstwruJ.jpg",
    vote_average: 8.856,
    vote_count: 605,
  },
  {
    adult: false,
    backdrop_path: "/lbLPVvgq16BD3IA6sIH3riu9ouO.jpg",
    genre_ids: [27, 9648, 878, 53],
    id: 762504,
    media_type: "movie",
    original_language: "en",
    original_title: "Nope",
    overview:
      "Residents in a lonely gulch of inland California bear witness to an uncanny, chilling discovery.",
    popularity: 1419.195,
    poster_path: "/AcKVlWaNVVVFQwro3nLXqPljcYA.jpg",
    release_date: "2022-07-20",
    title: "Nope",
    video: false,
    vote_average: 7.104,
    vote_count: 797,
  },
];

describe("MovieList Test", () => {
  test("Passing empty movie arrays, dont have movies", () => {
    const initialValues = {
      listName: "Prueba",
      movies: [],
      baseUrl: "",
      backdropSizes: [],
      selectedMovie: {},
      setSelectedMovie: () => {},
    };

    const component = render(<MovieList {...initialValues} />);

    const movieList = component.getByTestId("MovieList");

    expect(movieList.childNodes.length === 0).toBe(true);
  });

  test("Passing array of 4 movies, renders 4 movies", () => {
    const initialValues = {
      listName: "Prueba",
      movies,
      baseUrl: "",
      backdropSizes: [],
      selectedMovie: {},
      setSelectedMovie: () => {},
    };

    const component = render(
      <Provider store={store}>
        <MovieList {...initialValues} />
      </Provider>
    );

    const movieList = component.getByTestId("MovieList");

    expect(movieList.childNodes.length === 4).toBe(true);
  });

  test("Passing array of 4 movies, third movie have de correct tittle", () => {
    const initialValues = {
      listName: "Prueba",
      movies,
      baseUrl: "image.tmdb.org/t/p/",
      backdropSizes: [],
      selectedMovie: {},
      setSelectedMovie: () => {},
    };

    const component = render(
      <Provider store={store}>
        <MovieList {...initialValues} />
      </Provider>
    );

    const movieList = component.getByTestId("MovieList");
    const thirdMovie = movieList.children.item(2);
    const thirdMovieTittle = thirdMovie.querySelector(".movie-title").textContent;

    expect(thirdMovieTittle).toBe(movies[2].original_name);
  });

  test("Passing array of 4 movies, first movie have de correct image", () => {
    const initialValues = {
      listName: "Prueba",
      movies,
      baseUrl: "image.tmdb.org/t/p/",
      backdropSizes: [],
      selectedMovie: {},
      setSelectedMovie: () => {},
    };

    const component = render(
      <Provider store={store}>
        <MovieList {...initialValues} />
      </Provider>
    );

    const movieList = component.getByTestId("MovieList");
    const firstMovie = movieList.firstChild;
    const firstMovieImage = firstMovie.querySelector(".image");

    const firstMovieSrc = `${initialValues.baseUrl}original${movies[0].poster_path}`

    expect(firstMovieImage.getAttribute("src")).toBe(firstMovieSrc);
  });
});
