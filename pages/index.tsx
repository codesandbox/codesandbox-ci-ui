import React from "react";
import { Head } from "next/document";
import { SkeletonStatusPage } from "../components/SkeletonStatusPage";

export default () => (
  <SkeletonStatusPage>
    <Head>
      <title>CodeSandbox CI</title>
    </Head>
    <p>Welcome to CodeSandbox CI</p>
    <a
      target="_blank"
      style={{ color: "#6CC7F6" }}
      href="https://u2edh.csb.app"
      rel="noreferrer noopener"
    >
      Learn more
    </a>
  </SkeletonStatusPage>
);
