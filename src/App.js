import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import styled from "styled-components";

import { EcgProvider } from "./services/ecgContext";
import Header from "./components/Header";
import SetMeasure from "./scenes/SetMeasure/SetMeasure";
import Measure from "./scenes/Measure/Measure";
import Results from "./scenes/Results/Results";

class App extends Component {
  render() {
    return (
      <Router>
        <Header />
        <Route path="/" exact component={SetMeasure} />
        <Route path="/measure/" component={Measure} />
        <Route path="/results/" component={Results} />
      </Router>
    );
  }
}

export default () => (
  <EcgProvider>
    <App />
  </EcgProvider>
);
