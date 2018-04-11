import * as React from "react";
import styled from "styled-components";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";

import Home from "./scenes/Home";
import User from "./scenes/User";
import COLORS from "./constants/colors"

const MainWrapper = styled.div`
  font-family: "Helvetica Neue";
  color: ${COLORS.primary};
  span, button, input, select {
    font-size: 14px;
  }
`;

const App = () => {
  return (
    <MainWrapper>
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
    </MainWrapper>
  );
};

export default App;
