import React from "react";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";
import JavascriptTimeAgo from "javascript-time-ago";
// The desired locales.
import en from "javascript-time-ago/locale/en";

import { Header } from "./Header";
import { StatusListItem } from "./StatusListItem";
import { StatusList } from "./StatusList";
import { Details } from "./Details";
import { colors } from "../theme/colors";
import {
  IPR,
  IBuild,
  getPrs,
  getBuilds,
  IBuildDetails,
  getBuildDetails
} from "../utils/api";

// Initialize the desired locales.
JavascriptTimeAgo.locale(en);

const Content = styled.div`
  display: flex;
  height: 100%;
`;

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

export interface StatusPageProps {
  username: string;
  repo: string;
  prs: IPR[];
  selectedPrNumber: number;
  selectedBuildId: number;
  builds?: IBuild[];
}

const StatusPage = ({
  username,
  repo,
  prs,
  selectedPrNumber = prs[0].number,
  selectedBuildId,
  builds
}: StatusPageProps) => {
  const latestBuild = prs.find(pr => pr.number === selectedPrNumber)
    .latestBuild;

  const buildsToShow = builds || [latestBuild];
  const selectedBuild = builds.find(build => build.id === selectedBuildId);

  return (
    <ThemeProvider theme={colors}>
      <main style={{ height: "100%" }}>
        <GlobalStyles />
        <Header username={username} repo={repo} />

        <Content>
          <StatusList title="Pull Requests">
            {prs.map(pr => (
              <StatusListItem
                key={pr.id}
                title={`#${pr.number}`}
                description={pr.title}
                timestamp={+new Date(pr.createdAt)}
                status={pr.latestBuild.status}
                selected={pr.number === selectedPrNumber}
                link={{
                  href: `/status/[username]/[repo]/pr/[prNumber]`,
                  as: `/status/${username}/${repo}/pr/${pr.number}`
                }}
              />
            ))}
          </StatusList>

          <StatusList title="Build Activity">
            {buildsToShow.map(build => (
              <StatusListItem
                key={build.id}
                title={`#${build.id}`}
                description={build.commitTitle}
                timestamp={+new Date(build.createdAt)}
                status={build.status}
                selected={build.id === selectedBuildId}
                link={{
                  as: `/status/${username}/${repo}/pr/${selectedPrNumber}/builds/${
                    build.id
                  }`,
                  href: `/status/[username]/[repo]/pr/[prNumber]/builds/[buildId]`
                }}
              />
            ))}
          </StatusList>

          <Details
            build={selectedBuild}
            repo={repo}
            username={username}
            prNumber={selectedPrNumber}
          />
        </Content>
      </main>
    </ThemeProvider>
  );
};

StatusPage.getInitialProps = async ({ query }): Promise<StatusPageProps> => {
  const { username, repo } = query;

  if (!username) {
    throw new Error("Please define a username");
  }

  if (!repo) {
    throw new Error("Please define a repo");
  }

  const { prs } = await getPrs(username, repo);
  let prNumber = query.prNumber;
  if (!prNumber) {
    prNumber = prs[0].number;
  }

  prNumber = +prNumber;

  const selectedPR = prs.find(pr => pr.number === prNumber);
  let buildId = query.buildId;
  if (!buildId) {
    buildId = selectedPR.latestBuildId;
  }
  buildId = +buildId;

  const { builds } = await getBuilds(username, repo, prNumber);

  return {
    username,
    repo,
    prs,
    builds,
    selectedPrNumber: prNumber,
    selectedBuildId: buildId
  };
};

export { StatusPage };
