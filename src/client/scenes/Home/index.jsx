import * as React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import COLORS from "../../constants/colors";
import Loading from "../../components/Loading";
import Card from "../../components/Card";
import Button from "../../components/Button";
import InputText from "../../components/InputText";

const Wrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Header = styled.h1`
  color: ${COLORS.secondary};
  max-width: 600px;
  margin: 20px auto;
  padding: 0 5px;
  box-sizing: border-box;
`;
const CardsWrapper = styled.div`
  display: flex;
  max-width: 600px;
  margin: 0 auto;
`;
const CardContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

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
          loading: false
        });
      });
  }

  toggleLoading = () => {
    this.setState(state => ({ loading: !state.loading }));
  };

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

    if (loading) return <Loading />;

    return (
      <Wrapper>
        <Header>Smart Tshirt</Header>
        <CardsWrapper>
          <Card>
            <CardContentWrapper>
              <h3>Select user</h3>
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
              <Button linkTo={`/user/${selectedUserId}`}>Go!</Button>
            </CardContentWrapper>
          </Card>
          <Card>
            <CardContentWrapper>
              <h3>Create new one user</h3>
              <InputText placeholder="Name" type="text" value={newUser} onChange={this.setNewUser} />
              <Button onClick={this.createNewUser}>Create!</Button>
            </CardContentWrapper>
          </Card>
        </CardsWrapper>
      </Wrapper>
    );
  }
}

export default Home;
