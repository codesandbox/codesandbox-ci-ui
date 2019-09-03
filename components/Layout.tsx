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

const GlobalStyles = createGlobalStyle<{ theme: any }>`
  html,
  body {
    background-color: ${props => props.theme.bg1};
    margin: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    color: ${props => props.theme.white};

    font-family: "Inter", Roboto, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    color: ${props => props.theme.white};
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
      color: ${props => props.theme.white};
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
    transition: 0.3s ease color;
    text-decoration: none;
    color: rgba(255, 255, 255, 0.5);
    display: flex;
    align-items: center;

    &:hover {
      color: rgba(255, 255, 255, 0.8);
    }

    svg {
      margin-right: 0.5rem;
    }
  }
`;

const Main = styled.main`
  height: 100%;
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
    <Main>
      <GlobalStyles />
      <Header title={title || `${username}/${repo}`} />

      {selectedPr && !selectedBuild ? (
        <BreadCrumbs>
          <Link
            href={`/status/[username]/[repo]`}
            as={`/status/${username}/${repo}`}
          >
            <a>
              <Back /> Back to Pull Requests
            </a>
          </Link>
        </BreadCrumbs>
      ) : null}
      {selectedBuild ? (
        <BreadCrumbs>
          <Link
            href={`/status/[username]/[repo]/pr/[prNumber]`}
            as={`/status/${username}/${repo}/pr/${selectedPr}`}
          >
            <a>
              <Back /> Back to PR #{selectedPr}
            </a>
          </Link>
        </BreadCrumbs>
      ) : null}

      {children}
    </Main>
  </ThemeProvider>
);
