import * as React from "react";
import * as R from "ramda";

import Loading from "../../../../components/Loading";

class Track extends React.Component {
  state = {
    loading: true,
    tracking: false,
    data: [],
    waitingResponse: ""
  };
  ws = null;

  constructor(props) {
    super(props);

    this.connect();
  }

  connect = () => {
    this.ws = new WebSocket("ws://localhost:3000");
    this.ws.onopen = () => {
      console.log("connected!!!");
      this.setState(state => ({ loading: !state.loading }));

      this.ws.onmessage = messageEvent => {
        const message = JSON.parse(messageEvent.data);
        console.log("received:", message);

        if (message.type !== this.state.waitingResponse) {
          return;
        }

        if (message.type === "start") {
          this.setState({
            waitingResponse: "data",
            tracking: true
          });
        }
        if (message.type === "data") {
          this.setState(state => ({
            data: R.compose(R.takeLast(100), R.append(message.data))(state.data)
          }));
        }
        if (message.type === "stop") {
          console.log("data on stop", message.data);
          this.setState({
            waitingResponse: "",
            tracking: false,
            data: R.takeLast(100, message.data)
          });
        }
      };
    };
  };

  startTracking = () => {
    this.setState(
      {
        waitingResponse: "start",
        data: []
      },
      () => {
        const message = {
          type: "start",
          userId: this.props.match.params.id
        };
        this.ws.send(JSON.stringify(message));
      }
    );
  };

  stopTracking = () => {
    this.setState(
      {
        waitingResponse: "stop"
      },
      () => {
        const message = {
          type: "stop"
        };
        this.ws.send(JSON.stringify(message));
      }
    );
  };

  render() {
    const { loading, tracking, waitingResponse, data } = this.state;
    console.log("props", this.props);

    if (loading) return <Loading />;

    return (
      <div>
        Track waiting for: {waitingResponse} <br />
        {!tracking && <button onClick={this.startTracking}>Start</button>}
        {tracking && <button onClick={this.stopTracking}>Stop</button>}
        <br />
        {data.map(piece => `${piece.value} `)}
      </div>
    );
  }
}

export default Track;
