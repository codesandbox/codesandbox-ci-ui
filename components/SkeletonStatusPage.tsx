import React from "react";
import styled from "styled-components";

import { Layout } from "./Layout";
import { StatusList } from "./StatusList";
import { StatusListSkeletonItem } from "./StatusListItem";
import { ForkIcon } from "./icons/Fork";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.bg2};

  font-size: 1.4375rem;

  svg {
    margin-bottom: 2rem;
  }
`;

const Wrapper = styled.div`
  display: flex;
  height: 100%;

  @media screen and (max-width: 768px) {
    div:first-child,
    div:nth-child(2) {
      display: none;
    }
  }
`;

export const SkeletonStatusPage: React.FC<{}> = ({ children }) => (
  <Layout title="CodeSandbox CI">
    <Wrapper>
      <StatusList title="Pull Requests">
        <StatusListSkeletonItem />
        <StatusListSkeletonItem />
        <StatusListSkeletonItem />
      </StatusList>
      <StatusList title="Build Activity">
        <StatusListSkeletonItem />
      </StatusList>
      <Container>
        <ForkIcon />
        {children}
      </Container>
    </Wrapper>
  </Layout>
);
