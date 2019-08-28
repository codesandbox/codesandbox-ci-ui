import React from "react";
import { SkeletonStatusPage } from "../components/SkeletonStatusPage";

export default () => (
  <SkeletonStatusPage>
    <p>Welcome to CodeSandbox CI</p>
    <a
      target="_blank"
      href="https://u2edh.csb.app"
      rel="noreferrer noopener"
      style={{ color: "#6CC7F6" }}
    >
      Learn more
    </a>
  </SkeletonStatusPage>
);
