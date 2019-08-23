import React from "react";
import styled from "styled-components";
import { Animate } from "react-show";

import { CollapseIcon } from "./icons/Collapse";

import { colors } from "../theme/colors";

const Header = styled.div<{ backgroundColor: string; color: string }>`
  position: relative;
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

const Button = styled.button`
  position: absolute;
  right: 1rem;
  outline: 0;
  border: 0;
  background-color: transparent;
  margin: 0;
  padding: 0;
  color: white;
  cursor: pointer;
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
`;

const StyledCollapseIcon = styled(CollapseIcon)<{ show: boolean }>`
  transition: 0.3s ease transform;
  transform: rotateZ(${props => (props.show ? 0 : 90)}deg);
`;

interface Props {
  headerColor?: string;
  headerBGColor?: string;
  contentsRef?: React.Ref<HTMLDivElement>;
  style?: React.CSSProperties;
  collapsible?: boolean;
  expandedByDefault?: boolean;
  title: string;
}

export const BuildInfoItem: React.FC<Props> = ({
  title,
  collapsible,
  expandedByDefault = true,
  contentsRef,
  headerColor,
  headerBGColor,
  children,
  style
}) => {
  const [show, setShow] = React.useState(expandedByDefault);
  return (
    <div style={style}>
      <Header
        color={headerColor || "white"}
        backgroundColor={headerBGColor || colors.bg3}
      >
        {title}

        {collapsible && (
          <Button onClick={() => setShow(!show)}>
            <StyledCollapseIcon show={show} />
          </Button>
        )}
      </Header>
      <Animate
        show={show}
        duration={300}
        style={{
          height: "auto",
          overflow: "hidden"
        }}
        start={{
          height: 0 // The starting style for the component.
          // If the 'leave' prop isn't defined, 'start' is reused!
        }}
      >
        <Contents ref={contentsRef}>{children}</Contents>
      </Animate>
    </div>
  );
};
