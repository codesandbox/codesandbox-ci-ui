import React from 'react';
import styled from 'styled-components';
import { BuildInfoItem } from './BuildInfoItem';
import { ISandbox } from '../utils/api';
import { BuildListItem } from './BuildListItem';

const Logo = ({
  width = 32,
  height = 32,
  className,
  style,
}: {
  width?: number;
  height?: number;
  className?: string;
  style?: React.CSSProperties;
}) => (
  <svg
    aria-label="CodeSandbox"
    role="presentation"
    x="0px"
    y="0px"
    className={className}
    width={typeof width === 'number' ? `${width}px` : width}
    height={typeof height === 'number' ? `${height}px` : height}
    viewBox="0 0 452 452"
    style={{ verticalAlign: 'middle', ...style }}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0 452h452V0H0v452zm405.773-46.227V46.227H46.227v359.546h359.546z"
      fill="currentColor"
    />
  </svg>
);

const StyledLogo = styled(Logo)`
  width: 0.875rem;
  height: 0.875rem;
  margin-right: 0.5rem;
  line-height: 1rem;
`;

const SandboxTitle = styled.div`
  width: 15rem;
  margin-right: 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  display: flex;
  align-items: center;
`;

const Source = styled.span`
  color: ${props => props.theme.gray};
`;

interface Props {
  style?: React.CSSProperties;
  sandboxes?: ISandbox[];
}

export const SandboxList = ({ style, sandboxes }: Props) => {
  return (
    <BuildInfoItem style={style} title="Generated Sandboxes">
      {sandboxes.map((sandbox, i) => (
        <BuildListItem
          href={sandbox.url}
          target="_blank"
          rel="noopener"
          key={sandbox.url}
          i={i}
        >
          <SandboxTitle>
            <StyledLogo /> {sandbox.title}
          </SandboxTitle>
          <Source>{sandbox.source}</Source>
        </BuildListItem>
      ))}
    </BuildInfoItem>
  );
};
