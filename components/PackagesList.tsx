import React from "react";
import { BuildInfoItem } from "./BuildInfoItem";
import { IPackage } from "../utils/api";
import { BuildListItem } from "./BuildListItem";

interface Props {
  style?: React.CSSProperties;
  packages: IPackage[];
}

export const PackagesList = ({ style, packages }: Props) => {
  return (
    <BuildInfoItem
      collapsible
      style={style}
      expandedByDefault={packages.length < 3}
      title={`Packages (${packages.length})`}
    >
      {packages.map((pkg, i) => (
        <BuildListItem href={pkg.url} target="_blank" key={pkg.url} i={i}>
          {pkg.name}
        </BuildListItem>
      ))}
    </BuildInfoItem>
  );
};
