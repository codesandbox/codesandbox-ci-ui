import React from "react";
import Document, { Head, Main, NextScript } from "next/document";
// Import styled components ServerStyleSheet
import { ServerStyleSheet } from "styled-components";

interface Props {
  styleTags: JSX.Element;
}

export default class MyDocument extends Document<Props> {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      };
    } finally {
      sheet.seal();
    }
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

          <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />

          <link
            href="https://fonts.googleapis.com/css?family=&display=swap"
            rel="stylesheet"
          />
          <link rel="stylesheet" href="/static/inter.css" />

          {this.props.styles}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
