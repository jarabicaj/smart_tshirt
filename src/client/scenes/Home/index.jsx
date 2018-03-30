import * as React from "react";
import { Link } from "react-router-dom";

import Loading from "../../components/Loading"

class Home extends React.Component {
  state = {
    loading: true,
    users: [],
    selectedUserId: null,
    newUser: ""
  };

  constructor(props) {
    super(props);

    fetch("http://localhost:3000/api/users", {
      // mode: "no-cors",
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          users: data,
          loading: false,
        });
      });
  }

  toggleLoading = () => {
    this.setState(state => ({loading: !state.loading}))
  }

  setUser = event => {
    console.log("setUser", event.target.value);
    this.setState({
      selectedUserId: event.target.value
    });
  };

  setNewUser = event => {
    this.setState({
      newUser: event.target.value
    });
  };

  createNewUser = () => {
    console.log("create new user");
    this.toggleLoading();
    fetch("http://localhost:3000/api/users", {
      method: "POST",
      body: JSON.stringify({
        name: this.state.newUser
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        // TODO: check if exists
        console.log("user created", data);
        this.props.history.push(`/user/${data.id}`);
      });
  };

  render() {
    const { loading, selectedUserId, users, newUser } = this.state;

    if (loading) return <Loading/>

    return (
      <div>
        <h1>Smart Tshirt</h1>
        Select user or create new one
        <select
          name="user"
          id="user"
          value={selectedUserId}
          onChange={this.setUser}
        >
          <option key="unselected" value={null}>
            Unselected
          </option>
          {users.map(user => (
            <option key={user.is} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <Link to={`/user/${selectedUserId}`}>Go!</Link>
        <input type="text" value={newUser} onChange={this.setNewUser} />
        <button onClick={this.createNewUser}>Create!</button>
      </div>
    );
  }
}

export default Home;
