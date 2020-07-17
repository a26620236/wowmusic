import React from 'react';
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
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
    this.playNext = this.playNext.bind(this)
  }
  componentDidMount() {
    let { isLogin } = this.props
    if (isLogin) {
      let { user } = this.props
      let { uid } = user
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
        return db.collection('users').doc(uid).collection('playlist').doc('queue').get()
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
  }
  render() {
    let { data, playlist } = this.state
    let { isLogin, isAdmin, user } = this.props
    let innerArr = []
    
    for (let i=0; i<data.length; i++){
      let arr = <Route path={'/album/' + data[i].name} key={i}>
        <Playlist isLogin={isLogin} isAdmin={isAdmin} data={data[i]} changePlaylist={this.changePlaylist.bind(this)} user={user}/>
      </Route>
      innerArr.push(arr)
    }
    if (isLogin) {
      return (
        <div className='homepage'>
          <div className='body'>
            <Navbar />
            <div className='content'>
              <Switch>
                <Route path='/search'>
                  <Search isLogin={isLogin} />
                </Route>
                <Route path='/mymusic'>
                  <MyMusic isLogin={isLogin} />
                </Route>
                {innerArr}
                <Route path='/admin'>
                  <Admin isLogin={isLogin} />
                </Route>
                <Route path='/musicqueue'>
                  <MusicQueue isLogin={isLogin} isAdmin={isAdmin} playlist={playlist} />
                </Route>
                <Route path='/homepage'>
                  <Header isLogin={isLogin} isAdmin={isAdmin} />
                  <div className='body'>
                    <AlbumList data={data} />
                  </div>
                </Route>
              </Switch>
            </div>
          </div>
          <div className='footer'>
            <MusicPlayer playlist={playlist} playNext={() => this.playNext(1)} playPrevious={() => this.playNext(-1)} playLoop={this.playLoop.bind(this)}/>
          </div>
        </div>
      )
    }
    else {
      return (
        <Redirect push to='/signin'></Redirect>
      )
    }
  }
  changePlaylist() {
    let playlist = []
    let { user } = this.props
    let { uid } = user
    db.collection('users').doc(uid).collection('playlist').doc('queue').get().then((doc) => {
      console.log(doc.data())
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
  playNext(num) {
    let newPlaylist = []
    let { user } = this.props
    let { playlist } = this.state
    let { playIndex,songs } = playlist[0]
    let { uid } = user
    if (playIndex < songs.length) {
      db.collection('users').doc(uid).collection('playlist').doc('queue').update({
        playIndex: playIndex + num
      }).then(() => {
        return db.collection('users').doc(uid).collection('playlist').doc('queue').get()
      }).then((doc) => {
        newPlaylist.push(doc.data())
        this.setState((currentState) => {
          let newState = {
            ...currentState,
            playlist: newPlaylist,
          }
          return newState
        })
      })
    }
  }
  playLoop() {
    let { songs } = this.state.playlist[0]
    let reset = -(songs.length - 1)
    this.playNext(reset)
  }
}

export { Homepage }
