import React from "react";
import Document, { Head, Main, NextScript } from "next/document";
// Import styled components ServerStyleSheet
import { ServerStyleSheet } from "styled-components";

interface Props {
  styleTags: JSX.Element;
}

export default class MyDocument extends Document<Props> {
  static getInitialProps({ renderPage }) {
    // Step 1: Create an instance of ServerStyleSheet
    const sheet = new ServerStyleSheet();

    // Step 2: Retrieve styles from components in the page
    const page = renderPage(App => props =>
      sheet.collectStyles(<App {...props} />)
    );

    // Step 3: Extract the styles as <style> tags
    const styleTags = sheet.getStyleElement();

    // Step 4: Pass styleTags as a prop
    return { ...page, styleTags };
  }

  render() {
    return (
      <html lang="en">
        <Head>
          <link
            crossOrigin="anonymous"
            rel="preload"
            href="/static/fonts/Inter-Regular.woff2"
            as="font"
          />

          <link
            crossOrigin="anonymous"
            rel="preload"
            href="/static/fonts/Inter-Medium.woff2"
            as="font"
          />

          <link
            crossOrigin="anonymous"
            rel="preload"
            href="/static/fonts/Inter-Bold.woff2"
            as="font"
          />

          <link rel="preload" href="/static/inter.css" as="style" />

          <link
            href="https://fonts.googleapis.com/css?family=Source+Code+Pro:600,700&display=swap"
            rel="stylesheet"
          />
          <link rel="stylesheet" href="/static/inter.css" />

          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
