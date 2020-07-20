import React from 'react';
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Search } from './search';

class HeaderSearch extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    let { isLogin, isAdmin, user } = this.props
    if (isLogin == true && isAdmin == true && user.username) {
      return (
        <div className='search-header'>
          <div className='page-btns'>
            <div>&#10094;</div>
            <div>&#10095;</div>
            <input placeholder='搜尋藝人或歌曲' />
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
      return (
        <div>isLoading</div>
      )
    }
  }
}

export default HeaderSearch

