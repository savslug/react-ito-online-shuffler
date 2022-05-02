import React from "react";
import { render, screen } from "@testing-library/react";
import { ItoOnlineCardShuffler } from "./App";

test("renders learn react link", () => {
  render(<ItoOnlineCardShuffler />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
