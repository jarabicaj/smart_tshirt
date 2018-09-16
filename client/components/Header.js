import * as React from "react";
import { Link } from "react-router-dom";

const Header = () => (
  <div>
    <Link to="/">Home</Link>
    <Link to="/live">Live</Link>
    <Link to="/history">History</Link>
  </div>
);

export default Header;
