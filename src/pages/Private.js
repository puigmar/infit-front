import React, { Component } from "react";
import WithAuth from "../lib/AuthProvider";

class Private extends Component {
  render() {
    return (
      <div>
        <h1>Welcome {this.props.user.username}</h1>
      </div>
    );
  }
}

export default WithAuth(Private);
