import * as React from "react";
import { Router, Switch, Route, Link } from "react-router-dom";

import Loading from "../../components/Loading";

import History from "./scenes/History";
import Track from "./scenes/Track";

class User extends React.Component {
  state = {
    loading: true,
    user: null
  };

  constructor(props) {
    super(props);

    fetch(`http://localhost:3000/api/users/${props.match.params.id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          user: data,
          loading: false
        });
      });
  }

  render() {
    const { loading, user } = this.state;
    console.log("props", this.props);
    const { match } = this.props;

    if (loading) return <Loading />;

    return (
      <div>
        <h1>{user.name}</h1>
        <Link to={`${match.url}/history`}>Passed data</Link>
        <Link to={`${match.url}/track`}>Monitor</Link>
        <Route path={`/user/:id/history`} component={History} />
        <Route path={`/user/:id/track`} component={Track} />
      </div>
    );
  }
}

export default User;
