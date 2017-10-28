import React, { Component } from 'react';
import io from 'socket.io-client';
import R from 'ramda';

import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from 'recharts';

class App extends Component {

  state = {
    data: [],
  };

  componentDidMount() {
    const socket = io('http://localhost:3000')
    socket.on('data', (data) => {
      this.setState({
        data: R.append({
          name: data.name,
          uv: parseInt(data.uv),
          pv: parseInt(data.pv),
          amt: parseInt(data.amt),
        }, this.state.data),
      })
    })
  }


  render() {
    console.log("data", this.state.data)
    return (<div>
      App
      <LineChart width={730} height={250} data={this.state.data}
                 margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="pv" stroke="#8884d8" />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
    </div>);
  }
}

export default App;
