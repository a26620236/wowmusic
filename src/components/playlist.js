import React from 'react';
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './header-normal'
import { db, firebase, storage } from '../static/js/firebase'

class Playlist extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      myFavorite: false
    }
    this.add = React.createRef()
    this.mobile__add = React.createRef()
    this.remove = React.createRef()
    this.mobile__remove = React.createRef()
  }
  componentDidMount() {
    let data = []
    let { albumName, favorite } = this.props
    db.collection('albums').doc(albumName).get().then((doc) => {
      data.push(doc.data())
      this.setState((currentState) => {
        let newState = {
          ...currentState,
          data,
        }
        return newState
      })
    })
    if (favorite.indexOf(albumName) !== -1) {
      this.setState((currentState) => {
        let newState = {
          ...currentState,
          myFavorite: true
        }
        return newState
      })
    }
  }
  render() {
    let { isLogin, isAdmin, changePlaylist, user } = this.props
    let { data, myFavorite } = this.state
    if (data.length > 0) {
      let { songs, name, photoUrl } = this.state.data[0]
      return (
        <div className='playlist'>
          <Header isLogin={isLogin} isAdmin={isAdmin} user={user} />
          <div className='wrapper'>
            <Album data={data[0]} />
            <div className='wrapper__background'>
              <div className='btns'>
                <div className='btns-play' onClick={this.play.bind(this)}>
                  <div className='btns-play-icon'><i className="far fa-play-circle"></i></div>
                </div>
                <div className={myFavorite ? 'btns-favorite-added' : 'btns-favorite'} onClick={myFavorite ? this.removeFavorite.bind(this) : this.addFavorite.bind(this)}>
                  <div className='btns-favorite-icon'><i className="fas fa-heart"></i></div>
                </div>
                <div className='alert' ref={this.add}>已加入您的收藏清單</div>
                <div className='alert' ref={this.remove}>已從您的收藏清單移除</div>
              </div>
              <div className='mobile-btns'>
                <div className='btns-play' onClick={this.play.bind(this)}>
                  <div className='btns-play-icon'><i className="fas fa-play"></i></div>
                  <div className='btns-play-text'>播放</div>
                </div>
                <div className='btns-middleline'></div>
                <div className={myFavorite ? 'btns-favorite-added' : 'btns-favorite'} onClick={myFavorite ? this.removeFavorite.bind(this) : this.addFavorite.bind(this)}>
                  <div className='btns-favorite-icon'><i className="fas fa-heart"></i></div>
                  <div className='btns-favorite-text'>收藏</div>
                </div>
                <div className='alert' ref={this.mobile__add}>已收藏</div>
                <div className='alert' ref={this.mobile__remove}>已移除</div>
              </div>
              <SongList songs={songs} name={name} photoUrl={photoUrl} data={data[0].songs} changePlaylist={changePlaylist} user={user} />
            </div>
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
  play() {
    let { songs, name, photoUrl } = this.state.data[0]
    let { changePlaylist, user } = this.props
    let { uid } = user
    db.collection('users').doc(uid).collection('playlist').doc('queue').set({
      songs,
      name,
      playIndex: 0,
      photoUrl,
    }).then(() => {
      changePlaylist()
    })
  }
  addFavorite() {
    let add = this.add.current
    let remove = this.remove.current
    let mobile__add = this.mobile__add.current
    let mobile__remove = this.mobile__remove.current
    let { data } = this.state
    let { user, changeFavorite } = this.props
    db.collection('users').doc(user.uid).collection('favorite').doc(data[0].name).set({
      album: data[0]
    }).then(() => {
      changeFavorite()
      this.setState((currentState) => {
        let newState = {
          ...currentState,
          myFavorite: true
        }
        return newState
      })
      remove.classList.remove('add-alert')
      remove.classList.add('alert')
      add.classList.remove('alert')
      add.classList.add('add-alert')

      mobile__remove.classList.remove('add-alert')
      mobile__remove.classList.add('alert')
      mobile__add.classList.remove('alert')
      mobile__add.classList.add('add-alert')
    })
  }
  removeFavorite() {
    let add = this.add.current
    let remove = this.remove.current
    let mobile__add = this.mobile__add.current
    let mobile__remove = this.mobile__remove.current
    let { data } = this.state
    let { user, changeFavorite } = this.props
    db.collection('users').doc(user.uid).collection('favorite').doc(data[0].name).delete().then(() => {
      changeFavorite()
      this.setState((currentState) => {
        let newState = {
          ...currentState,
          myFavorite: false
        }
        return newState
      })
      add.classList.add('alert')
      add.classList.remove('add-alert')
      remove.classList.remove('alert')
      remove.classList.add('add-alert')

      mobile__add.classList.add('alert')
      mobile__add.classList.remove('add-alert')
      mobile__remove.classList.remove('alert')
      mobile__remove.classList.add('add-alert')
    })
  }
}

class Album extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      totalLength: '',
    }
  }
  componentDidMount() {
    this.timeStamp()
  }
  render() {
    let time = this.state.totalLength
    let { data } = this.props
    if (data) {
      return (
        <div className='album-cover'>
          <div>
            <img src={data.photoUrl}></img>
          </div>
          <div className='inform'>
            <div>播放清單</div>
            <div>{data.name}</div>
            <div>{time}</div>
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
  timeStamp() {
    let { data } = this.props
    let time = 0
    for (let index in data.songs) {
      let length = data.songs[index].length.split(':')
      time = time + parseInt(length[0]) * 60 + parseInt(length[1])
    }
    let totalLength = 0
    let second = time % 60
    let minute = Math.floor(time / 60)
    let hour = 0
    if (minute >= 60) {
      hour = Math.floor(minute / 60)
      totalLength = hour + '小時' + minute + '分'
    }
    totalLength = minute + '分' + second + '秒'
    this.setState((currentState) => {
      let newState = {
        ...currentState,
        totalLength,
      }
      return newState
    })
  }
}
class SongList extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    let { changePlaylist, user, name, photoUrl } = this.props
    let songs = this.props.data
    if (songs.length > 0) {
      return (
        <div className='list'>
          {songs.map((e, index) => {
            return <Song data={e} key={index} index={index} changePlaylist={changePlaylist} user={user} songs={songs} name={name} photoUrl={photoUrl} />
          })}
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
class Song extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      mouseover: false,
    }
    this.div = React.createRef()
  }
  componentDidMount() {
    let song = this.div.current
    song.addEventListener("mouseover", () => {
      this.setState((currentState) => {
        let newState = {
          ...currentState,
          mouseover: true
        }
        return newState
      })
    })
    song.addEventListener("mouseout", (e) => {
      this.setState((currentState) => {
        let newState = {
          ...currentState,
          mouseover: false
        }
        return newState
      })
    })
  }
  render() {
    let song = this.props.data
    let { mouseover } = this.state
    if (song.name) {
      return (
        <div className='song' onClick={this.playSong.bind(this)} ref={this.div}>
          <div className='song-left'>
            <div className='play-btn'>
              <i className={mouseover ? "fas fa-play" : "fas fa-music"}></i>
            </div>
            <div className='song-inform'>
              <div className='song-name'>{song.name}</div>
              <div className='singer'>
                <div>{song.singer}</div>
                <div>．</div>
                <div>{song.album}</div>
              </div>
            </div>
          </div>
          <div className='song-right'>
            {song.length}
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
  playSong() {
    let { changePlaylist, user, index, songs, name, photoUrl } = this.props
    let { uid } = user
    db.collection('users').doc(uid).collection('playlist').doc('queue').set({
      songs,
      name,
      playIndex: index,
      photoUrl,
    }).then(() => {
      changePlaylist()
    })
  }
}
export { Playlist, SongList, Song }
