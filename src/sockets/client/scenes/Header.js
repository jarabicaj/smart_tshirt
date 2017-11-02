import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => (
  <div>
    <h1>Smart T-shirt</h1>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/live">Live tracking</Link>
      </li>
      <li>
        <Link to="/data">Data</Link>
      </li>
    </ul>
  </div>
)

export default Header
