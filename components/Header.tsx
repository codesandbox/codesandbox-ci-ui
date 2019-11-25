import React from "react";
import styled from "styled-components";

import { Logo } from "./icons/Logo";
import { QuestionIcon } from "./icons/Question";
import { LEARN_MORE_DOCUMENT_URL } from "../utils/constants";

export const HEADER_HEIGHT = "2.5rem";

const Container = styled.header`
  position: relative;
  width: 100%;
  height: ${HEADER_HEIGHT};
  display: flex;
  align-items: center;
  font-size: 0.8125rem;
  background-color: ${props => props.theme.bg3};
  border-bottom: 1px solid ${props => props.theme.bg1};
`;

const StyledLogo = styled(Logo)`
  font-size: 2rem;
  margin: 0 0.5rem;
  height: 1.5rem;
`;

const QuestionContainer = styled.a`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 0;
  top: 0;
  bottom: 0;
  color: ${props => props.theme.gray};

  width: ${HEADER_HEIGHT};
  border-left: 1px solid ${props => props.theme.bg1};

  cursor: pointer;
  &:hover {
    color: white;
  }
`;

interface Props {
  title: string;
  owner: string;
  repo: string;
}

export const Header = ({ title, owner, repo }: Props) => {
  return (
    <Container>
      <a style={{ display: "flex" }} href="https://codesandbox.io">
        <StyledLogo />
      </a>
      {owner && repo ? (
        <a
          href={`https://github.com/${owner}/${repo}`}
          target="_blank"
          rel="noreferrer noopener nofollow"
        >
          {title}
        </a>
      ) : (
        <div>{title}</div>
      )}
      <QuestionContainer
        href={LEARN_MORE_DOCUMENT_URL}
        target="_blank"
        rel="noreferrer noopener"
        aria-label="Learn more"
      >
        <QuestionIcon />
      </QuestionContainer>
    </Container>
  );
};
