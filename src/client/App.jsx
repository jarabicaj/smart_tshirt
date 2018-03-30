import * as React from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import Home from "./scenes/Home";
import User from "./scenes/User";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/user" component={() => <Redirect to="/" />} />
        <Route path="/user/:id" component={User} />
        {/*<Header />*/}
        {/*<Route exact path="/" component={Home} />*/}
        {/*<Route path="/live" component={LiveTracking} />*/}
        {/*<Route path="/data" component={HistoryData} />*/}
      </Switch>
    </Router>
  );
};

export default App;
