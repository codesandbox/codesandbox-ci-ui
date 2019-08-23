import React, { useEffect, useCallback } from "react";
import Router from "next/router";
import { StatusIcon } from "./StatusIcon";
import styled from "styled-components";
import ReactTimeAgo from "react-time-ago";
import { IBuild, IBuildDetails, getBuildDetails } from "../utils/api";
import { LogsContainer } from "./LogsContainer";
import { secondsToCounter } from "../utils/countdown";
import { Countdown } from "./Countdown";
import { SandboxList } from "./SandboxList";
import { PackagesList } from "./PackagesList";
import { BuildInfoItemSkeleton } from "./BuildInfoItem";
import { setGlobalState, useGlobalState } from "../utils/state";

const Container = styled.div`
  height: 100%;
`;

const BuildDetails = styled.div`
  margin-top: 1.5rem;
`;

const TitleContainer = styled.div`
  display: flex;
`;

const Title = styled.h1`
  font-weight: 400;
  font-size: 1rem;
  margin: 0;
  margin-bottom: 0.25rem;
`;

const Description = styled.div`
  font-weight: 400;
  font-size: 1rem;
  margin: 0;
  margin-bottom: 0;
  font-size: 0.75rem;
  line-height: 1.25rem;
  color: ${props => props.theme.gray};
`;

const StyledTimeAgo = styled(ReactTimeAgo)`
  color: ${props => props.theme.gray};
`;

const Link = styled.a.attrs({ target: "_blank", rel: "noreferrer noopener" })`
  transition: 0.3s ease color;
  color: rgba(255, 255, 255, 0.8);

  text-decoration: none;

  &:hover {
    color: white;
  }
`;

interface Props {
  username: string;
  repo: string;
  prNumber: number;
  build: IBuild;
}

export const BuildInfo = ({ username, repo, prNumber, build }: Props) => {
  const [buildDetails, setBuildDetails] = React.useState<IBuildDetails>();
  const [prs, setPrs] = useGlobalState("prs");

  const fetchBuildDetails = useCallback(async () => {
    const res = await getBuildDetails(username, repo, prNumber, build.id);
    setBuildDetails(res.build);

    if (prs) {
      const currentPr = prs.find(pr => pr.number === prNumber);
      if (currentPr.latestBuild.status !== res.build.pull.latestBuild.status) {
        setPrs(
          prs.map(pr => (pr.id === res.build.pull.id ? res.build.pull : pr))
        );
      }
    }
  }, [prNumber, repo, username, build.id]);

  useEffect(() => {
    return () => {
      setBuildDetails(undefined);
    };
  }, [build.id]);

  useEffect(() => {
    fetchBuildDetails();
  }, [fetchBuildDetails]);

  const usedBuild = buildDetails || build;
  useEffect(() => {
    function tick() {
      // @ts-ignore
      if (usedBuild.status === "running" || usedBuild.status === "queued") {
        fetchBuildDetails();
      }
    }

    let id = setInterval(tick, 3000);
    return () => clearInterval(id);
  }, [usedBuild.status, fetchBuildDetails]);

  return (
    <Container>
      <TitleContainer>
        <StatusIcon
          style={{ marginRight: ".5rem", marginTop: ".1875rem" }}
          status={usedBuild.status}
        />

        <div>
          <Title>
            {username}/{repo}
            &nbsp;&nbsp;&nbsp;&nbsp;
            {`#${usedBuild.id}`}
          </Title>

          <Description>
            {usedBuild.status === "queued" ? (
              `Queued`
            ) : (
              <>
                Started <StyledTimeAgo date={+new Date(usedBuild.startedAt)} />{" "}
                •{" "}
                {build.status === "running" ? (
                  <Countdown startedAt={+new Date(usedBuild.startedAt)} />
                ) : (
                  secondsToCounter(Math.floor(usedBuild.duration / 1000))
                )}
              </>
            )}
            <br />
            <Link href={`https://github.com/${usedBuild.commitAuthor}`}>
              {usedBuild.commitAuthor}
            </Link>{" "}
            opened pull request{" "}
            <Link
              href={`https://github.com/${username}/${repo}/pull/${prNumber}`}
            >
              #{prNumber}
            </Link>{" "}
            to{" "}
            <Link
              href={`https://github.com/${username}/${repo}/tree/${
                usedBuild.targetBranch
              }`}
            >
              {usedBuild.targetBranch}
            </Link>
          </Description>
        </div>
      </TitleContainer>

      <BuildDetails>
        {buildDetails && buildDetails.sandboxes != null
          ? buildDetails.sandboxes.length > 0 && (
              <SandboxList
                style={{ marginBottom: "1rem" }}
                sandboxes={buildDetails.sandboxes}
              />
            )
          : build &&
            build.status === "succeeded" && (
              <BuildInfoItemSkeleton
                style={{ marginBottom: "1rem" }}
                title="Loading Sandboxes..."
              />
            )}

        {buildDetails && buildDetails.packages != null
          ? buildDetails.packages.length > 0 && (
              <PackagesList
                style={{ marginBottom: "1rem" }}
                packages={buildDetails.packages}
              />
            )
          : build &&
            build.status === "succeeded" && (
              <BuildInfoItemSkeleton
                style={{ marginBottom: "1rem" }}
                title="Loading Packages..."
              />
            )}

        <LogsContainer
          duration={usedBuild.duration}
          status={usedBuild.status}
          log={usedBuild["log"]}
        />
      </BuildDetails>
    </Container>
  );
};
