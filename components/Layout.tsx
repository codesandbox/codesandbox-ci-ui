import React from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import { colors } from "../theme/colors";
import { Header } from "./Header";

interface Props {
  title: string;
}

const GlobalStyles = createGlobalStyle`
  html,
  body {
    background-color: #040404;
    margin: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    color: white;

    font-family: "Inter", Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    color: white;
    font-size: 16px !important;

    -ms-overflow-style: -ms-autohiding-scrollbar;
  }

  #__next {
    height: 100%;
  }

  button {
    font-family: inherit;
  }

  * {
    box-sizing: border-box;
  }
`;

export const Layout: React.FC<Props> = ({ title, children }) => (
  <ThemeProvider theme={colors}>
    <main style={{ height: "100%" }}>
      <GlobalStyles />
      <Header title={title} />

      {children}
    </main>
  </ThemeProvider>
);
