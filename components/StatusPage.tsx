import React, { useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import JavascriptTimeAgo from "javascript-time-ago";
// The desired locales.
import en from "javascript-time-ago/locale/en";

import { HEADER_HEIGHT } from "./Header";
import { StatusListItem } from "./StatusListItem";
import { StatusList } from "./StatusList";
import { Details } from "./Details";
import { IPR, IBuild, getPrs, getBuilds, getPr } from "../utils/api";
import { Layout } from "./Layout";
import { SkeletonStatusPage } from "./SkeletonStatusPage";
import { useGlobalState } from "../utils/state";
import { colors } from "../theme/colors";
import {
  LEARN_MORE_DOCUMENT_URL,
  INSTALL_GITHUB_URL
} from "../utils/constants";
import { BUILD_LINK, buildLink, PR_LINK, prLink } from "../utils/url";
import { SetupPage } from "./SetupPage";
import { Button } from "./_elements";

// Initialize the desired locales.
JavascriptTimeAgo.locale(en);

type WrapperProps = {
  selectedPr?: string | string[];
  selectedBuild?: string | string[];
};

const Content = styled.div`
  display: flex;
  height: calc(100% - ${HEADER_HEIGHT});
`;

const ErrorMessage = styled.p`
  max-width: 600px;
  text-align: center;
  line-height: 1.6;
`;

const WrapperPRS = styled.div<WrapperProps>`
  @media screen and (max-width: 768px) {
    display: ${props =>
      props.selectedPr || props.selectedBuild ? "none" : "block"};
    width: 100%;
  }
`;

const WrapperBuilds = styled.div<WrapperProps>`
  @media screen and (max-width: 768px) {
    display: ${props =>
      !props.selectedPr || props.selectedBuild ? "none" : "block"};
    width: 100%;
  }
`;

const WrapperDetails = styled.div<WrapperProps>`
  @media screen and (max-width: 768px) {
    display: ${props => (!props.selectedBuild ? "none" : "block")};
  }
  width: 100%;
  overflow: hidden;
`;

export interface StatusPageProps {
  username: string;
  repo: string;
  prs: IPR[];
  selectedPrNumber: number;
  selectedBuildId: number;
  builds?: IBuild[];
  notFound?: boolean;
  showSetup?: boolean;
  error?: boolean | string;
}

const StatusPage = ({
  username,
  repo,
  prs,
  selectedPrNumber = prs && prs[0].number,
  selectedBuildId,
  builds,
  notFound,
  showSetup,
  error
}: StatusPageProps) => {
  const [statePrs, setPrs] = useGlobalState("prs");
  const usedPrs = statePrs || prs;
  const { query: params } = useRouter();

  useEffect(() => {
    setPrs(prs);
  }, [username, repo, prs, setPrs]);

  if (showSetup) {
    return <SetupPage />;
  }

  if (notFound) {
    return (
      <SkeletonStatusPage>
        <ErrorMessage>
          {typeof error === "string"
            ? error
            : "We could not find the repository you were looking for, have you installed the GitHub App?"}
        </ErrorMessage>

        <Button href={INSTALL_GITHUB_URL}>Install GitHub App</Button>
      </SkeletonStatusPage>
    );
  }

  if (notFound || error) {
    return (
      <SkeletonStatusPage>
        <ErrorMessage>
          We just got an error, please retry in a couple minutes!
        </ErrorMessage>
      </SkeletonStatusPage>
    );
  }

  if (usedPrs.length === 0) {
    return (
      <SkeletonStatusPage>
        <p>You haven't created any Pull Requests yet.</p>
        <a
          target="_blank"
          rel="noreferrer noopener"
          href={LEARN_MORE_DOCUMENT_URL}
          style={{ color: colors.blue }}
        >
          Learn more
        </a>
      </SkeletonStatusPage>
    );
  }

  const latestBuild = usedPrs.find(pr => pr.number === selectedPrNumber)
    .latestBuild;

  const buildsToShow = [...(builds || [latestBuild])];

  if (buildsToShow[0] && buildsToShow[0].id === latestBuild.id) {
    // latestBuild of the PR is always a bit more fresh, so use that as first one always
    buildsToShow.shift();
  }

  if (!buildsToShow.some(b => b.id === latestBuild.id)) {
    buildsToShow.unshift(latestBuild);
  }

  const selectedBuild = buildsToShow.find(
    build => build.id === selectedBuildId
  );

  return (
    <Layout
      selectedBuild={params.buildId}
      selectedPr={params.prNumber}
      username={username}
      repo={repo}
    >
      <Content>
        <WrapperPRS selectedBuild={params.buildId} selectedPr={params.prNumber}>
          <StatusList title="Pull Requests">
            {usedPrs.map(pr => (
              <StatusListItem
                key={pr.id}
                title={`#${pr.number}`}
                description={pr.title}
                timestamp={+new Date(pr.createdAt)}
                status={pr.latestBuild.status}
                selected={pr.number === selectedPrNumber}
                link={{
                  href: PR_LINK,
                  as: prLink(username, repo, pr.number)
                }}
              />
            ))}
          </StatusList>
        </WrapperPRS>
        <WrapperBuilds
          selectedBuild={params.buildId}
          selectedPr={params.prNumber}
        >
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
                  href: BUILD_LINK,
                  as: buildLink(username, repo, selectedPrNumber, build.id)
                }}
              />
            ))}
          </StatusList>
        </WrapperBuilds>
        <WrapperDetails
          selectedBuild={params.buildId}
          selectedPr={params.prNumber}
        >
          <Details
            build={selectedBuild}
            repo={repo}
            username={username}
            prNumber={selectedPrNumber}
          />
        </WrapperDetails>
      </Content>
    </Layout>
  );
};

function getTitle(username: string, repo: string, buildId?: number) {
  let title = `${username}/${repo}`;

  if (typeof buildId !== "undefined") {
    title += ` #${buildId}`;
  }

  return title;
}

StatusPage.getInitialProps = async ({
  query,
  res
}): Promise<
  { title?: string } & (
    | StatusPageProps
    | { notFound: true; error?: string }
    | { showSetup: true }
    | { error: true })
> => {
  try {
    const { username, repo } = query;

    if (!username) {
      throw new Error("Please define a username");
    }

    if (!repo) {
      throw new Error("Please define a repo");
    }

    const { prs } = await getPrs(username, repo);

    if (prs.length === 0) {
      // No PRs have been registered yet

      return { showSetup: true, title: "CodeSandbox CI Installed" };
    }

    let prNumber = query.prNumber;
    if (!prNumber) {
      prNumber = prs[0].number;
    }

    prNumber = +prNumber;

    let selectedPR = prs.find(pr => pr.number === prNumber);
    if (!selectedPR) {
      try {
        selectedPR = (await getPr(username, repo, prNumber)).pr;
      } catch (e) {
        return {
          notFound: true,
          error: "We could not find the PR you were looking for"
        };
      }
      prs.unshift(selectedPR);
    }
    let buildId = query.buildId;
    if (!buildId) {
      buildId = selectedPR.latestBuildId;
    }
    buildId = +buildId;

    const { builds } = await getBuilds(username, repo, prNumber);

    if (
      !builds.some(b => b.id === buildId) &&
      selectedPR.latestBuild.id !== buildId
    ) {
      // If the build is not in the list, or not in the latest build, we have a 404 and default
      // to the latest build.

      buildId = selectedPR.latestBuild.id;
      if (res) {
        res.writeHead(302, {
          Location: buildLink(
            username,
            repo,
            selectedPR.number,
            selectedPR.latestBuild.id
          )
        });
        res.end();
        return;
      }
    }

    return {
      username,
      repo,
      prs,
      builds,
      selectedPrNumber: prNumber,
      selectedBuildId: buildId,
      title: getTitle(username, repo, buildId)
    };
  } catch (e) {
    console.error(e);
    if (e.response) {
      if (res) {
        res.status = e.response.status;
      }

      if (e.response.status === 404) {
        return { notFound: true, title: "Not Found" };
      } else {
        return { error: true };
      }
    } else {
      return { error: true };
    }
  }
};

export { StatusPage };
