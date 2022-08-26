import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
// import { prettyDOM } from "@testing-library/dom";
import StarRate from "./StarRate";

describe("StarRate Test", () => {
  test("Pass 0 rate, renders 0 stars", () => {
    const rate = 0;

    const component = render(<StarRate rate={rate} size={"small"} />);

    const starRate = component.getByTestId("StarRate");
    // console.log(prettyDOM(spinner));

    expect(starRate.childNodes.length === 0).toBe(true);
  });

  test("Pass 1 rate, renders half stars", () => {
    const rate = 1;

    const component = render(<StarRate rate={rate} size={"small"} />);

    const starRate = component.getByTestId("StarRate");
    // console.log(prettyDOM(spinner));

    expect(starRate.lastChild.getAttribute("src") === "halfStar.svg").toBe(
      true
    );
  });

  test("Pass 2 rate, renders a star", () => {
    const rate = 2;

    const component = render(<StarRate rate={rate} size={"small"} />);

    const starRate = component.getByTestId("StarRate");
    // console.log(prettyDOM(spinner));

    expect(starRate.lastChild.getAttribute("src") === "star.svg").toBe(
      true
    );
  });

  test("Pass 3 rate, renders a one and a half star", () => {
    const rate = 3;

    const component = render(<StarRate rate={rate} size={"small"} />);

    const starRate = component.getByTestId("StarRate");
    // console.log(prettyDOM(spinner));

    expect(starRate.firstChild.getAttribute("src") === "star.svg").toBe(true);
    expect(starRate.lastChild.getAttribute("src") === "halfStar.svg").toBe(true);
  });

  test("Pass 10 rate, renders 5 stars", () => {
    const rate = 10;

    const component = render(<StarRate rate={rate} size={"small"} />);

    const starRate = component.getByTestId("StarRate");
    // console.log(prettyDOM(spinner));

    expect(starRate.childNodes.length === 5).toBe(true);
  });
});
