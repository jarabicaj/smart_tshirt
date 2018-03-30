import React, { Component } from 'react'
import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from 'recharts'

import Controller from './services/Controller'

class LiveTracking extends Component {
  state = {
    connected: false,
    data: [],
  }
  controller

  constructor(props) {
    super(props)

    this.controller = new Controller('ws://localhost:3000')
    this.controller.setDataListener(this.handleReceiveData)

    this.controller.init().then(() => {
      this.setConnected(true)
    })
  }

  setConnected(connected) {
    this.setState({
      connected,
    })
  }

  handleReceiveData = data => {
    const newData = [...this.state.data, data]
    const sliced = newData.slice(
      newData.length > 50 ? newData.length - 50 : 0,
      newData.length,
    )
    this.setState({
      data: sliced,
    })
  }

  handleStartTracking = () => {
    this.controller.startTracking()
  }
  handleStopTracking = () => {
    this.controller.stopTracking()
  }

  render() {
    const { data } = this.state
    const speed =
      data.length > 1
        ? 1000 / (data[data.length - 1].time - data[data.length - 2].time)
        : 0
    return (
      <div>
        Live tracking<div>
          {this.state.connected ? 'Connected!' : 'Waiting for connection'}
        </div>
        <button onClick={this.handleStartTracking}>Start</button>
        <button onClick={this.handleStopTracking}>Stop</button>
        Speed: {Math.round(speed * 100) / 100} f/s
        <LineChart
          isAnimationActive={false}
          width={730}
          height={250}
          data={this.state.data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid isAnimationActive={false} strokeDasharray="3 3" />
          <XAxis isAnimationActive={false} dataKey="time" />
          <YAxis isAnimationActive={false} />
          {/*<Tooltip isAnimationActive={false} />*/}
          <Legend isAnimationActive={false} />
          <Line
            isAnimationActive={false}
            type="monotone"
            dataKey="amplitude"
            stroke="#8884d8"
          />
        </LineChart>
      </div>
    )
  }
}

export default LiveTracking
