import "@testing-library/jest-dom";
import { ThemeProvider } from "styled-components";
import theme from "@/styles/theme";
import { render } from "@testing-library/react";
import "next-router-mock";
import React from "react";
import { expect } from "@jest/globals";

jest.mock("next/link", () => {
  const Link = ({ href, children }) => <a href={href}>{children}</a>;
  Link.displayName = "NextLink";
  return Link;
})

const customRender = (ui, options) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>, options);

global.jestExpect = expect;

export * from "@testing-library/react";
export { customRender as render };