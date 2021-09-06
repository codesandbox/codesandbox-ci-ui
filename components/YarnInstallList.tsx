import React from 'react';
import { BuildInfoItem } from './BuildInfoItem';
import { IPackage } from '../utils/api';
import { CodeBlock } from './CodeBlock';

interface Props {
  style?: React.CSSProperties;
  packages: IPackage[];
}

export const YarnInstallList = ({ style, packages }: Props) => {
  const packageLinks = packages.map(p => p.url).join(' ');
  return (
    <BuildInfoItem
      collapsible
      scrollable
      style={style}
      expandedByDefault={packages.length < 4}
      title="Local Install Instructions"
    >
      <CodeBlock>
        # yarn 1
        <br />
        yarn add {packageLinks}
        <br />
        # yarn 2, 3
        <br />
        yarn add{' '}
        {packageLinks
          .split(' ')
          .map(link => `${link}/_pkg.tgz`)
          .join(' ')}
        <br />
        # npm
        <br />
        npm i {packageLinks}
      </CodeBlock>
    </BuildInfoItem>
  );
};
