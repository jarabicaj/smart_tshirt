import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip
} from "recharts";

const Chart = ({ data }) => (
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
    {/* <Legend /> */}
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

export default React.memo(
  Chart,
  (prevProps, nextProps) => prevProps.timestamp === nextProps.timestamp
);
