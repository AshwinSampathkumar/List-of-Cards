// Packages
import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// components
import Dashboard from "../pages/dashboard";

class Navigator extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Dashboard} exact />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Navigator