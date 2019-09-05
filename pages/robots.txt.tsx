import React from "react";

export default class extends React.Component {
  static async getInitialProps({ req, res }) {
    res.write(`User-agent: *
Disallow: `);
    res.end();
  }
}
