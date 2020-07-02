import React from 'react';
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class Header extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className='header'>
        <div>
          <div>上一頁</div>
          <div>下一頁</div>
        </div>
        <div>使用者</div>
      </div>
    )
  }
}

export default Header
