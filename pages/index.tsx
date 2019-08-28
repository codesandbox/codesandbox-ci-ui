import React from "react";
import { SkeletonStatusPage } from "../components/SkeletonStatusPage";
import { colors } from "../theme/colors";

export default () => (
  <SkeletonStatusPage>
    <p>Welcome to CodeSandbox CI</p>
    <a
      target="_blank"
      href="https://u2edh.csb.app"
      rel="noreferrer noopener"
      style={{ color: colors.blue }}
    >
      Learn more
    </a>
  </SkeletonStatusPage>
);
