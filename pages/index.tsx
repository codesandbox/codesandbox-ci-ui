import React from "react";
import { SkeletonStatusPage } from "../components/SkeletonStatusPage";
import { colors } from "../theme/colors";
import { LEARN_MORE_DOCUMENT_URL } from "../utils/constants";

export default () => (
  <SkeletonStatusPage>
    <p>Welcome to CodeSandbox CI</p>
    <a
      target="_blank"
      href={LEARN_MORE_DOCUMENT_URL}
      rel="noreferrer noopener"
      style={{ color: colors.blue }}
    >
      Learn more
    </a>
  </SkeletonStatusPage>
);
