import * as React from "react";
import { Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./scenes/Home";
import History from "./scenes/History";
import Live from "./scenes/Live";

const Root = () => (
  <div>
    <Header />
    <Route path="/" exact component={Home} />
    <Route path="/history" component={History} />
    <Route path="/live" component={Live} />
  </div>
);

export default Root;
