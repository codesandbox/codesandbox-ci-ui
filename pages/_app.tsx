import App, { Container } from "next/app";
import Head from "next/head";
import React from "react";
import { GlobalStateProvider } from "../utils/state";

export default class CodeSandboxCI extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <GlobalStateProvider>
        <Container>
          <Head>
            <title>
              {pageProps.title
                ? `${pageProps.title} - CodeSandbox CI`
                : "CodeSandbox CI"}
            </title>

            <link rel="icon" type="image/x-icon" href="/static/favicon.ico" />

            <meta
              name="description"
              content="CodeSandbox CI is a continuous integration system built for open source library maintainers."
            />
          </Head>
          <Component {...pageProps} />
        </Container>
      </GlobalStateProvider>
    );
  }
}
