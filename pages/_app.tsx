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
          </Head>
          <Component {...pageProps} />
        </Container>
      </GlobalStateProvider>
    );
  }
}
