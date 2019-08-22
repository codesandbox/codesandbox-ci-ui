import React from "react";
import styled from "styled-components";

import Logo from "@codesandbox/common/lib/components/Logo";

export const HEADER_HEIGHT = "2.5rem";

const Container = styled.header`
  width: 100%;
  height: ${HEADER_HEIGHT};
  display: flex;
  align-items: center;
  font-size: 0.8125rem;
  background-color: ${props => props.theme.bg3};
  border-bottom: 1px solid ${props => props.theme.bg1};
`;

const StyledLogo = styled(Logo)`
  margin: 0 1rem;
  height: 1.5rem;
`;

interface Props {
  title: string;
}

export const Header = ({ title }: Props) => {
  return (
    <Container>
      <StyledLogo />
      {title}
    </Container>
  );
};
