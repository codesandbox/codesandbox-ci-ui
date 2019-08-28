import React from "react";
import { BuildInfoItem } from "./BuildInfoItem";
import { IPackage } from "../utils/api";
import { CodeBlock } from "./CodeBlock";

interface Props {
  style?: React.CSSProperties;
  packages: IPackage[];
}

export const YarnInstallList = ({ style, packages }: Props) => {
  return (
    <BuildInfoItem
      collapsible
      style={style}
      expandedByDefault={packages.length < 3}
      title="Install Instructions"
    >
      <CodeBlock>yarn add {packages.map(p => p.url).join(" ")}</CodeBlock>
    </BuildInfoItem>
  );
};
