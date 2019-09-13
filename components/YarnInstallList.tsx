import React from "react";
import { BuildInfoItem } from "./BuildInfoItem";
import { IPackage } from "../utils/api";
import { CodeBlock } from "./CodeBlock";

interface Props {
  style?: React.CSSProperties;
  packages: IPackage[];
}

export const YarnInstallList = ({ style, packages }: Props) => {
  const packageLinks = packages.map(p => p.url).join(" ");
  return (
    <BuildInfoItem
      collapsible
      scrollable
      style={style}
      expandedByDefault={packages.length < 3}
      title="Local Install Instructions"
    >
      <CodeBlock>
        yarn add {packageLinks}
        <br />
        npm i {packageLinks}
      </CodeBlock>
    </BuildInfoItem>
  );
};
