import React from 'react';
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class Navbar extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className='nav'>
        <div className='logo'>WOWMUSIC</div>
        <div className='link'>
          <Link to='/'>
            <div>首頁</div>
          </Link>
        </div>
        <div className='link'>
          <Link to='/search'>
            <div>搜尋</div>
          </Link>
        </div>
        <div className='link'>
          <Link to='/mymusic'>
            <div>我的音樂庫</div>
          </Link>
        </div>
      </div>
    )
  }
}

export default Navbar
