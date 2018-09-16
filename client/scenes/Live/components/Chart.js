import * as React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts";

// props: data, interval, delay

class Chart extends React.PureComponent {
  interval = null;

  state = {
    data: []
  };

  constructor(props) {
    super(props);
    this.interval = setInterval(this.takeData, props.interval);
  }

  takeData = () => {
    const { data, delay } = this.props;
    const lastTimestamp = new Date().getTime() - delay;
    this.setState({
      data: data.filter(x => x.timestamp < lastTimestamp)
    });
  };

  render() {
    const { data } = this.props;
    return (
      <LineChart
        width={730}
        height={250}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="timestamp" />
        <YAxis dataKey="value" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="timestamp" stroke="#8884d8" />
        <Line type="monotone" dataKey="value" stroke="#82ca9d" />
      </LineChart>
    );
  }
}

export default Chart;
