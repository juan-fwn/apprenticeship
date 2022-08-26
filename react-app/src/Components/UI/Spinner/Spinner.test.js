import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render } from "@testing-library/react";
import Spinner from "./Spinner";

test("renders content", () => {
  const size = "small";

  const component = render(<Spinner size={size} />);

  const spinner = component.getByTestId("Spinner");

  expect(spinner).toHaveStyle("width: 48px");
});
