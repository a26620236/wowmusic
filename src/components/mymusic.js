import React from 'react';
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './header-normal'
import AlbumList from './albumList'

class MyMusic extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    let { isLogin, isAdmin } = this.props
    return (
      <div className='mymusic'>
        <Header isLogin={isLogin} isAdmin={isAdmin} />
        <div className='mymusic-body'>
          <AlbumList />
          <AlbumList />
          <AlbumList />
        </div>
      </div>
    )
  }
}
export default MyMusic
