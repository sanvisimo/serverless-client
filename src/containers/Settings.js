import React, { Component } from "react";
import { API } from "aws-amplify";

export default class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    };
  }

  render() {
    return <div className="Settings" />;
  }
}
