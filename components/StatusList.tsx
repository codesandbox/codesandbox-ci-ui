import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 20rem;
  min-width: 20rem;
  height: 100%;

  border-right: 1px solid ${props => props.theme.bg3};
  overflow-y: auto;
`;

const Header = styled.div`
  height: 2rem;
  padding: 0 0.5rem;
  display: flex;
  align-items: center;
  color: white;
  font-size: 0.8125rem;

  color: ${props => props.theme.gray};
  background-color: ${props => props.theme.bg2};
`;

interface Props {
  title: string;
}

export const StatusList: React.FC<Props> = ({ title, children }) => (
  <Container>
    <Header>{title}</Header>
    {children}
  </Container>
);
