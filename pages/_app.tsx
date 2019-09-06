import React from "react";
import App, { Container } from "next/app";
import Head from "next/head";
import Router from "next/router";
import NProgress from "nprogress";
import { GlobalStateProvider } from "../utils/state";

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

export default class CodeSandboxCI extends App {
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
