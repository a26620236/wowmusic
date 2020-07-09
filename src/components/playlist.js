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
  }
  render() {
    let { isLogin, isAdmin, data } = this.props
    return (
      <div className='playlist'>
        <Header isLogin={isLogin} isAdmin={isAdmin}/>
        <div className='wrapper'>
          <Album data={data}/>
          <div className='wrapper__background'>
            <div className='btns'>
              <div>播放</div>
              <div>收藏</div>
            </div>
            <SongList data={data.songs} />
          </div>
        </div>
      </div>
    )
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
    let songs = this.props.data
    return(
      <div className='list'>
        {songs.map((e, index) => {
          return <Song data={e} key={index}/>
        })}
      </div>
    )
  }
}
class Song extends React.Component {
  constructor(props){
    super(props)
  } 
  render() {
    let song = this.props.data
    return (
      <div className='song'>
        <div className='song-left'>
          <div className='play-btn'><audio controls src={song.songUrl}></audio></div>
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
}
export { Playlist }
