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
    let { isLogin, isAdmin, user } = this.props
    if (isLogin == true && isAdmin == true && user.username) {
      return (
        <div className='header'>
          <div className='page-btns'>
            <div onClick={this.goBack.bind(this)}>&#10094;</div>
            <div onClick={this.goNext.bind(this)}>&#10095;</div>
          </div>
          <div className='users'>
            <div>{user.username}</div>
            <Link to='/admin'>
              admin
          </Link>
          </div>
        </div>
      )
    }
    else {
      return(
        <div>isLoading</div>
      )
    }
    if (isLogin == true && user.username) {
      return (
        <div className='header'>
          <div>
            <div>&#10094;</div>
            <div>&#10095;</div>
          </div>
          <div>
            <div>{user.username}</div>
          </div>
        </div>
      )
    }
    else {
      return(
        <div>isLoading</div>
      )
    }
  }
  goBack() {
    let history = window.history
    history.back()
  }
  goNext() {
    let history = window.history
    history.go(1)
  }
}

export default Header
