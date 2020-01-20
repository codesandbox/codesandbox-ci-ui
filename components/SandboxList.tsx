import React from 'react';
import styled from 'styled-components';
import Logo from '@codesandbox/common/lib/components/Logo';
import { BuildInfoItem } from './BuildInfoItem';
import { ISandbox } from '../utils/api';
import { BuildListItem } from './BuildListItem';

const StyledLogo = styled(Logo)`
  width: 1rem;
  margin-right: 0.5rem;
`;

const SandboxTitle = styled.div`
  width: 15rem;
  margin-right: 0.5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
