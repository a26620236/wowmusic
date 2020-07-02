import React from 'react';
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Navbar from './navbar'
import Header from './header-normal'
import AlbumList from './albumList'
import MusicPlayer from './musicplayer'
import Search from './search'
import MyMusic from './mymusic'
import { Playlist } from './playlist';

class Homepage extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Router>
        <div className='homepage'>
          <div className='body'>
            <Navbar />
            <div className='content'>
              <Switch>
                <Route path='/search'>
                  <Search />
                </Route>
                <Route path='/mymusic'>
                  <MyMusic />
                </Route>
                <Route path='/album/1'>
                  <Playlist />
                </Route>
                <Route path='/'>
                  <Header />
                  <div className='body'>
                    <AlbumList />
                    <AlbumList />
                    <AlbumList />
                  </div>
                </Route>
              </Switch>
            </div>
          </div>
          <div className='footer'>
            <MusicPlayer />
          </div>
        </div>
      </Router>
    )
  }
}

export { Homepage }
