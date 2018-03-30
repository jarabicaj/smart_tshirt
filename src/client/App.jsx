import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./scenes/Home";

const App = () => {
  return (
    <Router>
      <Route exact path="/" component={Home} />
      {/*<Header />*/}
      {/*<Route exact path="/" component={Home} />*/}
      {/*<Route path="/live" component={LiveTracking} />*/}
      {/*<Route path="/data" component={HistoryData} />*/}
    </Router>
  );
};

export default App;
