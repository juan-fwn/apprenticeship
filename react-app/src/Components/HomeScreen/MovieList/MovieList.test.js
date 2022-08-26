import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
// import { prettyDOM } from "@testing-library/dom";
import MovieList from "./MovieList";

describe("MovieList Test", () => {
  test("Pass 0 rate, renders 0 stars", () => {
    const rate = 0;

    const component = render(<MovieList rate={rate} size={"small"} />);

    const MovieList = component.getByTestId("MovieList");
    // console.log(prettyDOM(spinner));

    expect(MovieList.childNodes.length === 0).toBe(true);
  });

  test("Pass 1 rate, renders half stars", () => {
    const rate = 1;

    const component = render(<MovieList rate={rate} size={"small"} />);

    const MovieList = component.getByTestId("MovieList");
    // console.log(prettyDOM(spinner));

    expect(MovieList.lastChild.getAttribute("src") === "halfStar.svg").toBe(
      true
    );
  });

  test("Pass 2 rate, renders a star", () => {
    const rate = 2;

    const component = render(<MovieList rate={rate} size={"small"} />);

    const MovieList = component.getByTestId("MovieList");
    // console.log(prettyDOM(spinner));

    expect(MovieList.lastChild.getAttribute("src") === "star.svg").toBe(
      true
    );
  });

  test("Pass 3 rate, renders a one and a half star", () => {
    const rate = 3;

    const component = render(<MovieList rate={rate} size={"small"} />);

    const MovieList = component.getByTestId("MovieList");
    // console.log(prettyDOM(spinner));

    expect(MovieList.firstChild.getAttribute("src") === "star.svg").toBe(true);
    expect(MovieList.lastChild.getAttribute("src") === "halfStar.svg").toBe(true);
  });

  test("Pass 10 rate, renders 5 stars", () => {
    const rate = 10;

    const component = render(<MovieList rate={rate} size={"small"} />);

    const MovieList = component.getByTestId("MovieList");
    // console.log(prettyDOM(spinner));

    expect(MovieList.childNodes.length === 5).toBe(true);
  });
});
