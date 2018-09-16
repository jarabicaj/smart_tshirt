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

// props: data, interval, delay, dataLength, dataPerSec, active

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
    const { data, delay, dataLength, dataPerSec, active } = this.props;
    if (!active) {
      return;
    }
    const lastTimestamp = new Date().getTime() - delay;
    const filteredData = data.filter(x => x.timestamp < lastTimestamp);
    const emptyDataLength = dataLength - filteredData;
    console.log("takeData", lastTimestamp, dataPerSec, dataLength);
    const emptyData =
      emptyDataLength > 0
        ? new Array(emptyDataLength).fill(undefined).map((_, index) => ({
            timestamp: lastTimestamp + dataPerSec * index,
            value: 150
          }))
        : [];
    console.log("emptydata", emptyData);
    this.setState({
      data: emptyData.concat(filteredData)
    });
  };

  render() {
    const { data } = this.state;
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
        {/* <Line type="monotone" dataKey="timestamp" stroke="#8884d8" /> */}
        <Line
          dot={false}
          activeDot={false}
          isAnimationActive={false}
          type="monotone"
          dataKey="value"
          stroke="#82ca9d"
        />
      </LineChart>
    );
  }
}

export default Chart;
