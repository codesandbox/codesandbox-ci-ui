import React from "react";
import { SkeletonStatusPage } from "../components/SkeletonStatusPage";
import { LEARN_MORE_DOCUMENTATION_URL } from "../utils/constants";
import { Title, Description } from "./_elements";
import { ConfigExamples } from "../components/ConfigExamples";
import { colors } from "../theme/colors";

export default () => (
  <SkeletonStatusPage>
    <Title>You've installed CodeSandbox CI!</Title>
    <Description>
      The last step is to create a Pull Request with the CI configuration file
      in your repository at `.codesandbox/ci.json`{" "}
      <a
        href="https://github.com/framer/motion/pull/331"
        rel="noopener noreferrer"
        target="_blank"
        style={{ color: colors.blue }}
      >
        (example)
      </a>
      .
    </Description>
    <div style={{ width: 800, marginTop: "2rem" }}>
      <div style={{ color: "#ccc", fontSize: 14, marginBottom: 4 }}>
        Example Configurations
      </div>
      <ConfigExamples />
    </div>
    <Description>
      And that’s it! Now check your Pull Request on GitHub to see your built
      library. For more information, go to{" "}
      <a
        style={{ color: colors.blue }}
        href={LEARN_MORE_DOCUMENTATION_URL}
        rel="noopener"
        target="_blank"
      >
        our documentation.
      </a>
    </Description>
  </SkeletonStatusPage>
);
