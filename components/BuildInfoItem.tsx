import React from "react";
import styled, { css } from "styled-components";
import { Animate } from "react-show";

import { CollapseIcon } from "./icons/Collapse";
import { pulse } from "../utils/animation";
import { lightenDarkenColor } from "../theme/colors";

const headerStyles = css<{ backgroundColor?: string; color?: string }>`
  position: relative;
  display: flex;
  align-items: center;
  outline: 0;
  padding: 0;
  padding-left: 1rem;
  height: 2rem;
  width: 100%;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  font-size: 0.8125rem;

  background-color: ${props => props.backgroundColor || props.theme.bg3};
  color: ${props => props.color || "white"};

  border: 1px solid ${props => props.theme.bg3};
`;

const Header = styled.div<{ backgroundColor?: string; color?: string }>`
  ${headerStyles}
`;

const HeaderButton = styled.button<{
  backgroundColor?: string;
  color?: string;
}>`
  transition: 0.3s ease background-color;
  ${headerStyles}
  cursor: pointer;

  &:hover {
    background-color: ${props => lightenDarkenColor(props.theme.bg3, 10)};
  }
`;

const CollapsibleContainer = styled.div`
  position: absolute;
  right: 1rem;
  outline: 0;
  border: 0;
  background-color: transparent;
  margin: 0;
  padding: 0;
  color: ${props => props.theme.white};
  cursor: pointer;
`;

const Contents = styled.div<{ scrollable?: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.bg1};
  font-size: 0.8125rem;
  border: 1px solid ${props => props.theme.bg3};
  border-top: 0;

  margin: 0;
  max-width: 100%;
  width: 100%;
  ${props =>
    props.scrollable &&
    css`
      overflow: auto;
    `}
`;

const StyledCollapseIcon = styled(CollapseIcon)<{ show: boolean }>`
  transition: 0.3s ease transform;
  transform: rotateZ(${props => (props.show ? 0 : -90)}deg);
`;

interface Props {
  headerColor?: string;
  headerBGColor?: string;
  contentsRef?: React.Ref<HTMLDivElement>;
  style?: React.CSSProperties;
  collapsible?: boolean;
  expandedByDefault?: boolean;
  title: string;
  scrollable?: boolean;
}

export const BuildInfoItem: React.FC<Props> = ({
  title,
  collapsible,
  expandedByDefault = true,
  contentsRef,
  headerColor,
  headerBGColor,
  children,
  style,
  scrollable
}) => {
  const [show, setShow] = React.useState(expandedByDefault);

  const HeaderComponent = collapsible ? HeaderButton : Header;
  return (
    <div style={style}>
      <HeaderComponent
        aria-label={collapsible ? "collapse" : undefined}
        onClick={collapsible ? () => setShow(!show) : undefined}
        color={headerColor}
        backgroundColor={headerBGColor}
      >
        {title}

        {collapsible && (
          <CollapsibleContainer
            aria-label="collapse"
            onClick={() => setShow(!show)}
          >
            <StyledCollapseIcon show={show} />
          </CollapsibleContainer>
        )}
      </HeaderComponent>
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
        <Contents scrollable={scrollable} ref={contentsRef}>
          {children}
        </Contents>
      </Animate>
    </div>
  );
};

const SkeletonContents = styled.div`
  ${pulse};
  width: 12rem;
  height: 1rem;
  margin: 0.75rem 1rem;
  background-color: ${props => props.theme.bg3};
`;

export const BuildInfoItemSkeleton = ({
  title,
  style
}: {
  title: string;
  style?: React.CSSProperties;
}) => (
  <div style={style}>
    <Header>{title}</Header>

    <div>
      <Contents>
        <SkeletonContents />
      </Contents>
    </div>
  </div>
);
