import React from 'react'

// First we import some modules...
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Header from './Header'

import Home from './home'
import LiveTracking from './liveTracking'
import HistoryData from './historyData'

const App = () => (
  <Router>
    <div>
      <Header />
      <Route exact path="/" component={Home} />
      <Route path="/live" component={LiveTracking} />
      <Route path="/data" component={HistoryData} />
    </div>
  </Router>
)

export default App
