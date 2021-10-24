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
  const yarn2PackageLinks = packages
    .map(p => `${p.name}@${p.url}/_pkg.tgz`)
    .join(' ');
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
        yarn add {yarn2PackageLinks}
        <br />
        # npm
        <br />
        npm i {packageLinks}
      </CodeBlock>
    </BuildInfoItem>
  );
};
