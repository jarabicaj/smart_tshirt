import * as React from "react";

import Chart from "./components/Chart";
import { start, stop, getData } from "./services/api";

const DELAY = 2000; // ms
const REPEAT = 1000; // ms
const WINDOW = 2000; // ms
const DATA_PER_SEC = 512;

class Live extends React.PureComponent {
  interval = null;

  state = {
    name: "Pepo",
    data: [],
    active: false,
    from: null
  };

  loadData = async () => {
    const { from } = this.state;
    const { data } = await getData(from);
    const lastTimestamp = new Date().getTime() - DELAY - WINDOW;
    this.setState(state => ({
      data: state.data.filter(x => x.timestamp > lastTimestamp).concat(data),
      from: data.length ? data[data.length - 1].timestamp : from
    }));
  };

  handleChangeName = ev => {
    this.setState({ name: ev.target.value });
  };

  start = async () => {
    const { active } = this.state;
    if (active) {
      return;
    }
    this.setState(
      {
        from: new Date().getTime(),
        active: true
      },
      async () => {
        await start();
        this.interval = setInterval(this.loadData, 1000);
      }
    );
  };

  stop = async () => {
    const { active } = this.state;
    if (!active) {
      return;
    }
    await stop();
    clearInterval(this.interval);
    this.setState({
      active: false
    });
  };

  render() {
    const { name, data, active } = this.state;
    console.log("render data:", data);
    return (
      <div>
        <h1>Live data</h1>
        <input value={name} onChange={this.handleChangeName} />
        <button onClick={this.start}>Start</button>
        <button onClick={this.stop}>Stop</button>
        <Chart
          active={active}
          data={data}
          dataLength={(WINDOW / 1000) * DATA_PER_SEC}
          dataPerSec={DATA_PER_SEC}
          interval={64}
          // interval={10000}
          delay={DELAY}
        />
      </div>
    );
  }
}

export default Live;
