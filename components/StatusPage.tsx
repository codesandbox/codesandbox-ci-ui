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
import { IPR, IBuild, getPrs, getBuilds } from "../utils/api";
import { Layout } from "./Layout";
import { SkeletonStatusPage } from "./SkeletonStatusPage";
import { useGlobalState } from "../utils/state";
import { colors } from "../theme/colors";
import { LEARN_MORE_DOCUMENT_URL } from "../utils/constants";

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
`;

export interface StatusPageProps {
  username: string;
  repo: string;
  prs: IPR[];
  selectedPrNumber: number;
  selectedBuildId: number;
  builds?: IBuild[];
  notFound?: boolean;
  error?: boolean;
}

const StatusPage = ({
  username,
  repo,
  prs,
  selectedPrNumber = prs && prs[0].number,
  selectedBuildId,
  builds,
  notFound,
  error
}: StatusPageProps) => {
  const [statePrs, setPrs] = useGlobalState("prs");
  const usedPrs = statePrs || prs;
  const { query: params } = useRouter();

  useEffect(() => {
    setPrs(prs);
  }, [username, repo, prs, setPrs]);

  if (notFound || error) {
    return (
      <SkeletonStatusPage>
        <ErrorMessage>
          {notFound
            ? `We could not find the repository you were looking for, have you
            installed the GitHub App?`
            : `We just got an error, please retry in a couple minutes!`}
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

  buildsToShow.unshift(latestBuild);

  const selectedBuild = builds.find(build => build.id === selectedBuildId);

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
                  href: `/status/[username]/[repo]/pr/[prNumber]`,
                  as: `/status/${username}/${repo}/pr/${pr.number}`
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
                  as: `/status/${username}/${repo}/pr/${selectedPrNumber}/builds/${build.id}`,
                  href: `/status/[username]/[repo]/pr/[prNumber]/builds/[buildId]`
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

StatusPage.getInitialProps = async ({
  query,
  res
}): Promise<
  { title?: string } & (StatusPageProps | { notFound: true } | { error: true })
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
      selectedBuildId: buildId,
      title: `${username}/${repo}`
    };
  } catch (e) {
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
