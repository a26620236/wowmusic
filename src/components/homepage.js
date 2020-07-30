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
import Category from './category'
import { db, firebase } from '../static/js/firebase'

class Homepage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      playlist: [],
      category: [],
      allAlbums: [],
      favorite: [],
      changePlaylist: false,
      firstLoad: true,
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
      let category = []
      let allAlbums = []
      let favorite = []
      let arr = []
      let arr1 = []
      db.collection("albums").where('category', '==', '熱門好歌').get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          arr.push(doc.data())
        });
        data.push(arr)
        return db.collection("albums").where('category', '==', '古典樂').get()
      }).then((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
          arr1.push(doc.data())
        });
        data.push(arr1)
        return db.collection('users').doc(uid).collection('playlist').doc('queue').get()
      }).then((doc) => {
        playlist.push(doc.data())
        return db.collection('users').doc(uid).collection('favorite').get()
      }).then((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
          favorite.push(doc.data().album.name)
        })
        return db.collection("category").get()
      }).then((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
          category.push(doc.data())
        })
        return db.collection('allAlbums').get()
      }).then((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
          allAlbums.push(doc.data())
        });
        this.setState((currentState) => {
          let newState = {
            ...currentState,
            data,
            playlist,
            category,
            allAlbums,
            favorite,
          }
          return newState
        })
      });
    }
  }
  render() {
    let { data, playlist, category, allAlbums, favorite, firstLoad } = this.state
    let { isLogin, isAdmin, user } = this.props
    let innerArr = []
    let innerArr1 = []
    
    for (let i = 0; i < allAlbums.length; i++){
      let arr = <Route path={'/album/' + allAlbums[i].name} key={i}>
        <Playlist isLogin={isLogin} isAdmin={isAdmin} albumName={allAlbums[i].name} changePlaylist={this.changePlaylist.bind(this)} user={user} favorite={favorite} changeFavorite={this.changeFavorite.bind(this)} />
      </Route>
      innerArr.push(arr)
    }
    for (let i=0; i<category.length; i++) {
      let arr = <Route path={'/category/' + category[i].category} key={i}>
        <Category category={category[i].category} isLogin={isLogin} isAdmin={isAdmin} user={user}/>
      </Route>
      innerArr1.push(arr)
    }
    if (isLogin) {
      return (
        <div className='homepage'>
          <div className='body'>
            <Navbar />
            <div className='content'>
              <Switch>
                <Route path='/search'>
                  <Search isLogin={isLogin} isAdmin={isAdmin} user={user}/>
                </Route>
                <Route path='/mymusic'>
                  <MyMusic isLogin={isLogin} isAdmin={isAdmin} user={user}/>
                </Route>
                {innerArr}
                {innerArr1}
                <Route path='/admin'>
                  <Admin isLogin={isLogin} user={user}/>
                </Route>
                <Route path='/musicqueue'>
                  <MusicQueue isLogin={isLogin} isAdmin={isAdmin} playlist={playlist} user={user}/>
                </Route>
                <Route path='/homepage'>
                  <Header isLogin={isLogin} isAdmin={isAdmin} user={user}/>
                  <div className='body'>
                    <AlbumList data={data} />
                  </div>
                </Route>
              </Switch>
            </div>
          </div>
          <div className='footer'>
            <MusicPlayer playlist={playlist} playNext={() => this.playNext(1)} playPrevious={() => this.playNext(-1)} playLoop={this.playLoop.bind(this)} firstLoad={firstLoad}/>
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
      playlist.push(doc.data())
      this.setState((currentState) => {
        let newState = {
          ...currentState,
          playlist,
          changePlaylist: true,
          firstLoad: false
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
  changeFavorite() {
    let favorite = []
    let { user } = this.props
    let { uid } = user
    db.collection('users').doc(uid).collection('favorite').get().then((querySnapshot) => {
      querySnapshot.forEach(function (doc) {
        favorite.push(doc.data().album.name)
      })
      this.setState((currentState) => {
        let newState = {
          ...currentState,
          favorite,
        }
        return newState
      })
    })
  }
}

export { Homepage }
