import React from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import Link from "next/link";
import { Back } from "./icons/Back";
import { colors } from "../theme/colors";
import { Header } from "./Header";

interface Props {
  title?: string;
  username?: string;
  repo?: string;
  selectedPr?: string | string[];
  selectedBuild?: string | string[];
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

  a {
    transition: 0.3s ease color;
    color: rgba(255, 255, 255, 0.8);
    font-weight: 600;

    text-decoration: none;

    &:hover {
      color: white;
    }
  }

  * {
    box-sizing: border-box;
  }
`;

const BreadCrumbs = styled.div`
  @media screen and (min-width: 769px) {
    display: none;
  }

  font-size: 0.8125rem;
  background-color: ${props => props.theme.bg2};
  padding: 0.5rem;

  a {
    text-decoration: none;
    color: rgba(255, 255, 255, 0.6);
    display: flex;
    align-items: center;

    svg {
      margin-right: 0.5rem;
    }
  }
`;

export const Layout: React.FC<Props> = ({
  username,
  title,
  repo,
  children,
  selectedPr,
  selectedBuild
}) => (
  <ThemeProvider theme={colors}>
    <main style={{ height: "100%" }}>
      <GlobalStyles />
      <Header title={title || `${username}/${repo}`} />
      <BreadCrumbs>
        {selectedPr && !selectedBuild ? (
          <Link
            href={`/status/[username]/[repo]`}
            as={`/status/${username}/${repo}`}
          >
            <a>
              <Back /> Back to Pull Requests
            </a>
          </Link>
        ) : null}
        {selectedBuild ? (
          <Link
            href={`/status/[username]/[repo]/pr/[prNumber]`}
            as={`/status/${username}/${repo}/pr/${selectedPr}`}
          >
            <a>
              <Back /> Back to PR #{selectedPr}
            </a>
          </Link>
        ) : null}
      </BreadCrumbs>
      {children}
    </main>
  </ThemeProvider>
);
