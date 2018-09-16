import * as React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Root from "./Root";

ReactDOM.render(
  <Router>
    <Root />
  </Router>,
  document.getElementById("app")
);
