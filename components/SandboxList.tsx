import React from "react";
import styled from "styled-components";
import Logo from "@codesandbox/common/lib/components/Logo";
import { BuildInfoItem } from "./BuildInfoItem";
import { colors } from "../theme/colors";

const StyledLogo = styled(Logo)`
  width: 1rem;
  margin-right: 0.5rem;
`;

const SandboxItem = styled.a<{ i: number }>`
  transition: 0.3s ease background-color;
  display: flex;
  align-items: center;
  height: 2rem;

  text-decoration: none;
  color: white;

  padding: 0.5rem 1rem;

  background-color: ${props => (props.i % 2 === 1 ? colors.bg2 : colors.bg1)};
  cursor: pointer;

  &:hover {
    background-color: #111111;
  }
`;

interface Props {
  style?: React.CSSProperties;
  sandboxes?: { title: string; url: string; source: string }[];
}

export const SandboxList = ({ style }: Props) => {
  const sandboxes = [
    {
      title: "hello world",
      url: "https://codesandbox.io/s/new",
      source: "Mentioned Issue"
    },
    {
      title: "todomvc",
      url: "https://codesandbox.io/s/aaa",
      source: "PR"
    },
    {
      title: "counter",
      url: "https://codesandbox.io/s/bbb",
      source: "Configuration"
    }
  ];

  return (
    <BuildInfoItem style={style} title="Generated Sandboxes">
      {sandboxes.map((sandbox, i) => (
        <SandboxItem href={sandbox.url} target="_blank" key={sandbox.url} i={i}>
          <StyledLogo /> {sandbox.title}
        </SandboxItem>
      ))}
    </BuildInfoItem>
  );
};
