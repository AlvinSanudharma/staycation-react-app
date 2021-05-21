import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import IconText from "parts/IconText";

export default class LandingPage extends Component {
  render() {
    return (
      <div>
        <div className="p-2">
          <Router>
            <IconText></IconText>
          </Router>
        </div>
      </div>
    );
  }
}
