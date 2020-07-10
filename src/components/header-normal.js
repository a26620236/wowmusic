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
    let isLogin = this.props.isLogin
    let isAdmin = this.props.isAdmin
    if (isLogin == true && isAdmin == true) {
      return (
        <div className='header'>
          <div className='page-btns'>
            <div>&#10094;</div>
            <div>&#10095;</div>
          </div>
          <div className='users'>
            <div>使用者</div>
            <Link to='/admin'>
              admin
          </Link>
          </div>
        </div>
      )
    }
    if (isLogin == true) {
      return (
        <div className='header'>
          <div>
            <div>上一頁</div>
            <div>下一頁</div>
          </div>
          <div>
            <div>使用者</div>
          </div>
        </div>
      )
    }
  }
}

export default Header
