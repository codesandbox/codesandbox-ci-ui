import React from "react";
import { SkeletonStatusPage } from "../components/SkeletonStatusPage";
import { colors } from "../theme/colors";
import {
  LEARN_MORE_DOCUMENT_URL,
  INSTALL_GITHUB_URL
} from "../utils/constants";
import { Title, SubTitle, ButtonContainer, Link, Button } from "./_elements";

export default () => (
  <SkeletonStatusPage>
    <Title>Welcome to CodeSandbox CI</Title>
    <SubTitle>A CI built for library maintainers</SubTitle>
    <ButtonContainer>
      <Button href={INSTALL_GITHUB_URL}>Install GitHub App</Button>

      <Link
        target="_blank"
        href={LEARN_MORE_DOCUMENT_URL}
        rel="noopener"
        style={{ color: colors.blue }}
      >
        Learn more
      </Link>
    </ButtonContainer>
  </SkeletonStatusPage>
);
