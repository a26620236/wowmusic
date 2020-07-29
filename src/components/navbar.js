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
        <div className='logo'>
          <div className='logo__icon'><i className="fab fa-spotify"></i></div>
          <div className='logo__text'>WOWMUSIC</div>
        </div>
        <div className='link'>
          <Link to='/homepage'>
              <div className='homepage__icon'>
                <i className="fas fa-home"></i>
              </div>
              <div className='homepage__text'>
                首頁
              </div>
          </Link>
        </div>
        <div className='link'>
          <Link to='/search'>
            <div className='search__icon'>
              <i className="fas fa-stream"></i>
            </div>
            <div className='search__text'>瀏覽</div>
          </Link>
        </div>
        <div className='link'>
          <Link to='/mymusic'>
            <div className='mymusic__icon'>
              <i className="fas fa-music"></i>
            </div>
            <div className='mymusic__text'>
              收藏
            </div>
          </Link>
        </div>
      </div>
    )
  }
}

export default Navbar
