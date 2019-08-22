import React, { useEffect } from "react";
import styled from "styled-components";
import { colors } from "../theme/colors";

const Header = styled.div<{ backgroundColor: string; color: string }>`
  display: flex;
  align-items: center;
  padding-left: 1rem;
  height: 2rem;
  width: 100%;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  font-size: 0.8125rem;

  background-color: ${props => props.backgroundColor};
  color: ${props => props.color};

  border: 1px solid ${props => props.theme.bg3};
`;

const Contents = styled.div`
  background-color: ${props => props.theme.bg1};
  font-size: 0.8125rem;
  border: 1px solid ${props => props.theme.bg3};
  border-top: 0;

  margin: 0;
  max-width: 100%;
  width: 100%;
  overflow: auto;

  code {
    font-family: "Menlo", monospace;
  }
`;

interface Props {
  headerColor?: string;
  headerBGColor?: string;
  contentsRef?: React.Ref<HTMLDivElement>;
  style?: React.CSSProperties;
  title: string;
}

export const BuildInfoItem: React.FC<Props> = ({
  title,
  contentsRef,
  headerColor,
  headerBGColor,
  children,
  style
}) => (
  <div style={style}>
    <Header
      color={headerColor || "white"}
      backgroundColor={headerBGColor || colors.bg3}
    >
      {title}
    </Header>
    <Contents ref={contentsRef}>{children}</Contents>
  </div>
);
