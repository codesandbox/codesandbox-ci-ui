import React from "react";
import styled, { css } from "styled-components";

import Highlight, { defaultProps } from "prism-react-renderer";
import { PrismStyles } from "./styles/prism-styles";

const Container = styled.div`
  font-family: "Menlo", "Monaco", monospace;
  font-size: 16px;

  width: 100%;
  background-color: #242424;
  border-radius: 4px;
`;

const CODE_EXAMPLES = [
  {
    title: "Simple",
    code: `{
  // You probably don't need to set anything in the configuration,
  // we infer a lot of information from the repo. One value that's worth
  // setting is your default sandbox ids to fork for a PR. It's easier to test
  // on a sandbox that includes some test cases already.
  // This is also optional, we default to 'vanilla' if it isn't set.
  "sandboxes": ["new", "vanilla"]
}`
  },
  {
    title: "Monorepo",
    code: `{
  // If you have a monorepo we infer your packages from your Yarn workspaces
  // or lerna configuration by default. If you want to explicitly
  // set what to build, you can fill the 'packages' field with paths to your
  // packages
  "packages": ["packages/react", "packages/react-dom"],
  "sandboxes": ["new", "vanilla"]
}`
  },
  {
    title: "Custom Install/Build",
    code: `{
  // You can also set custom install or build commands. These commands
  // are appended after \`yarn run\` or \`npm run\`.
  // This will call \`yarn run custom-install\` or \`npm run custom-install\`:
  "installCommand": "custom-install",
  // You can also provide \`false\` as a value if you want to skip the step:
  "buildCommand": false
}`
  },
  {
    title: "GitHub Examples",
    code: `{
  // You can directly link to sandboxes in your GitHub repository. If you have
  // an example in \`/examples/todomvc\` in your repository, you can refer to this
  // example in the config. The advantage of this is that we will always take the
  // version of the example that's in your PR. If you have a PR that updates
  // the example, it will be reflected in the generated sandbox.
  "sandboxes": ["/examples/todomvc"]
}`
  }
];

const Buttons = styled.div`
  display: flex;
  width: 100%;
`;

const Button = styled.button<{ selected: boolean }>`
  transition: 0.3s ease all;
  font-family: "Inter";
  display: flex;
  width: 100%;
  text-align: center;
  justify-content: center;

  background-color: transparent;
  outline: 0;
  border: 0;
  font-size: 13px;
  color: #ccc;
  padding: 0.75rem 0;
  font-weight: 600;
  border-bottom: 2px solid rgba(0, 0, 0, 0.25);
  cursor: pointer;

  ${props =>
    props.selected &&
    css`
      color: white;
      border-color: #64d2ff;
    `}

  &:hover {
    color: white;
  }
`;

export const ConfigExamples = () => {
  const [exampleIndex, setExampleIndex] = React.useState(0);

  return (
    <>
      <Container>
        <Buttons>
          {CODE_EXAMPLES.map((example, i) => (
            <Button
              onClick={() => {
                setExampleIndex(i);
              }}
              selected={i === exampleIndex}
              key={i}
            >
              {example.title}
            </Button>
          ))}
        </Buttons>
        <div>
          <PrismStyles />
          <Highlight
            {...defaultProps}
            code={CODE_EXAMPLES[exampleIndex].code}
            theme={{ plain: { color: "#ccc" }, styles: [] }}
            // @ts-ignore
            language="json"
          >
            {({ className, style, tokens, getLineProps, getTokenProps }) => (
              <pre className={className} style={style}>
                {tokens.map((line, i) => (
                  <div {...getLineProps({ line, key: i })}>
                    {line.map((token, key) => (
                      <span {...getTokenProps({ token, key })} />
                    ))}
                  </div>
                ))}
              </pre>
            )}
          </Highlight>
        </div>
      </Container>
    </>
  );
};
