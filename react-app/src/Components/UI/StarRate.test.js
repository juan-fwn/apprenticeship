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

  test("Pass 0.25 rate, renders 0 stars", () => {
    const rate = 0.25;

    const component = render(<StarRate rate={rate} size={"small"} />);

    const starRate = component.getByTestId("StarRate");
    // console.log(prettyDOM(spinner));

    expect(starRate.childNodes.length === 0).toBe(true);
  });

  test("Pass 0.5 rate, renders a half star", () => {
    const rate = 0.5;

    const component = render(<StarRate rate={rate} size={"small"} />);

    const starRate = component.getByTestId("StarRate");
    // console.log(prettyDOM(spinner));

    expect(starRate.lastChild.getAttribute('src') === "halfStar.svg").toBe(true);
  });

  test("Pass 0.75 rate, renders a full star", () => {
    const rate = 0.75;

    const component = render(<StarRate rate={rate} size={"small"} />);

    const starRate = component.getByTestId("StarRate");
    // console.log(prettyDOM(spinner));
    console.log(starRate.lastChild.getAttribute('src'))

    expect(starRate.lastChild.getAttribute('src') === "star.svg").toBe(true);
  });

  test("Pass 10 rate, renders 5 stars", () => {
    const rate = 10;

    const component = render(<StarRate rate={rate} size={"small"} />);

    const starRate = component.getByTestId("StarRate");
    // console.log(prettyDOM(spinner));

    expect(starRate.childNodes.length === 5).toBe(true);
  });
});
