import * as React from "react";
import * as R from "ramda";
import { LineChart, CartesianGrid, XAxis, YAxis, Line } from "recharts";

import Loading from "../../../../components/Loading";

const UNSELECTED = "unselected";

class History extends React.Component {
  state = {
    loading: true,
    stats: null,
    selected: UNSELECTED
  };

  constructor(props) {
    super(props);

    fetch(`http://localhost:3000/api/stats/${props.match.params.id}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        this.setState({
          stats: R.reduce((acc, elem) => R.assoc(elem.id, elem, acc), {}, data),
          loading: false
        });
      });
  }

  handleSelect = ev => {
    const val = ev.target.value;
    const stat = this.state.stats[val];
    if (val === UNSELECTED || (stat && stat.data)) {
      this.setState({
        selected: val
      });
      return;
    }
    this.setState(
      state => ({
        loading: !state.loading,
        selected: val
      }),
      () => {
        fetch(
          `http://localhost:3000/api/values/${this.state.stats[val].values}`,
          {
            method: "GET",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            }
          }
        )
          .then(res => res.json())
          .then(data => {
            this.setState(state => ({
              stats: R.assocPath([stat.id, "data"], data.data, state.stats),
              loading: !state.loading
            }));
          });
      }
    );
  };

  render() {
    const { loading, stats, selected } = this.state;
    console.log("props", this.props, this.state);

    if (loading) return <Loading />;

    return (
      <div>
        <h2>History Data</h2>
        <select
          name="selected"
          id="selected"
          onChange={this.handleSelect}
          value={selected}
        >
          <option value={UNSELECTED} key={UNSELECTED}>
            Unselected
          </option>
          {R.values(stats).map(stat => (
            <option value={stat.id} key={stat.id}>
              {stat.from} - {stat.to}
            </option>
          ))}
        </select>
        <br />
        {selected !== "unselected" &&
          stats[selected].data && (
            <LineChart isAnimationActive={false} width={1000} height={300} data={stats[selected].data}>
              <CartesianGrid isAnimationActive={false} stroke="#ccc" />
              <XAxis isAnimationActive={false} dataKey="time" />
              <YAxis
                isAnimationActive={false}
                // domain={[-100, 500]}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                dot={false}
                isAnimationActive={false}
              />
            </LineChart>
          )}
      </div>
    );
  }
}

export default History;
