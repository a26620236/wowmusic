import React from 'react';
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import Navbar from './navbar'
import Header from './header-normal'
import AlbumList from './albumList'
import MusicPlayer from './musicplayer'
import Search from './search'
import MyMusic from './mymusic'
import { Playlist } from './playlist'
import Admin from './admin'
import MusicQueue from './musicQueue'
import { db, firebase } from '../static/js/firebase'

class Homepage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      playlist: [],
    }
  }
  componentDidMount() {
    let data = []
    let playlist = []
    db.collection("albums").where('category', '==', '熱門好歌').get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        data.push(doc.data())
      });
      return db.collection("albums").where('category', '==', '古典樂').get()
    }).then((querySnapshot) => {
      querySnapshot.forEach(function (doc) {
        data.push(doc.data())
      });
      return db.collection('playlist').doc('queue').get()
    }).then((doc) => {
      playlist.push(doc.data())
      this.setState((currentState) => {
        let newState = {
          ...currentState,
          data,
          playlist,
        }
        return newState
      })
    })
  }
  render() {
    let { data, playlist } = this.state
    let { isLogin, isAdmin } = this.props
    let innerArr = []
    
    for (let i=0; i<data.length; i++){
      let arr = <Route path={'/album/' + data[i].name} key={i}>
        <Playlist isLogin={isLogin} isAdmin={isAdmin} data={data[i]} changePlaylist={this.changePlaylist.bind(this)}/>
      </Route>
      innerArr.push(arr)
    }
    return (
      <div className='homepage'>
        <div className='body'>
          <Navbar />
          <div className='content'>
            <Switch>
              <Route path='/search'>
                <Search isLogin={isLogin}/>
              </Route>
              <Route path='/mymusic'>
                <MyMusic isLogin={isLogin}/>
              </Route>
              {innerArr}
              <Route path='/admin'>
                <Admin isLogin={isLogin}/>
              </Route>
              <Route path='/musicqueue'>
                <MusicQueue isLogin={isLogin} isAdmin={isAdmin} playlist={playlist}/>
              </Route>
              <Route path='/'>
                <Header isLogin={isLogin} isAdmin={isAdmin}/>
                <div className='body'>
                  <AlbumList data={data}/>
                </div>
              </Route>
            </Switch>
          </div>
        </div>
        <div className='footer'>
          <MusicPlayer playlist={playlist}/>
        </div>
      </div>
    )
  }
  changePlaylist() {
    let playlist = []
    db.collection('playlist').doc('queue').get().then((doc) => {
      playlist.push(doc.data())
      this.setState((currentState) => {
        let newState = {
          ...currentState,
          playlist,
        }
        return newState
      })
    })
  }
}

export { Homepage }
