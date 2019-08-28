import React from "react";
import styled from "styled-components";
import { BuildInfo } from "./BuildInfo";
import { IBuild } from "../utils/api";

const Container = styled.div`
  background-color: ${props => props.theme.bg2};
  width: 100%;
  height: 100%;

  padding: 2rem 1.5rem;
  overflow-y: auto;

  @media screen and (max-width: 768px) {
    padding: 0.5rem;
  }
`;

interface Props {
  build: IBuild;
  username: string;
  repo: string;
  prNumber: number;
}

export const Details = ({ build, username, repo, prNumber }: Props) => {
  return (
    <Container>
      <BuildInfo
        username={username}
        repo={repo}
        build={build}
        prNumber={prNumber}
      />
    </Container>
  );
};
