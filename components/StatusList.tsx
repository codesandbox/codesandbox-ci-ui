import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 20rem;
  min-width: 20rem;
  height: 100%;

  border-right: 1px solid ${props => props.theme.bg3};

  @media screen and (max-width: 768px) {
    min-width: 100%;
  }
`;

const Header = styled.div`
  height: 2rem;
  padding: 0 0.5rem;
  display: flex;
  align-items: center;
  color: ${props => props.theme.white};
  font-size: 0.8125rem;

  color: ${props => props.theme.white};
  background-color: ${props => props.theme.bg2};
`;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  overflow-y: auto;
`;

interface Props {
  title: string;
}

export const StatusList: React.FC<Props> = ({ title, children }) => (
  <Container>
    <Header>{title}</Header>
    <Wrapper>{children}</Wrapper>
  </Container>
);
