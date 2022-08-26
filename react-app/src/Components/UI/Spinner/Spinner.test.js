import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
// import { prettyDOM } from "@testing-library/dom";
import Spinner from "./Spinner";

describe("Spinner Test", () => {
  test("Renders with class small", () => {
    const size = "small";

    const component = render(<Spinner size={size} />);

    const spinner = component.getByTestId("Spinner");
    // console.log(prettyDOM(spinner));

    expect(spinner.classList.contains("small")).toBe(true);
  });

  test("Renders with class medium", () => {
    const size = "medium";

    const component = render(<Spinner size={size} />);

    const spinner = component.getByTestId("Spinner");
    // console.log(prettyDOM(spinner));

    expect(spinner.classList.contains("medium")).toBe(true);
  });

  test("Renders with class large", () => {
    const size = "large";

    const component = render(<Spinner size={size} />);

    const spinner = component.getByTestId("Spinner");
    // console.log(prettyDOM(spinner));

    expect(spinner.classList.contains("large")).toBe(true);
  });
});
