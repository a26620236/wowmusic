import React from 'react';
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './header-normal'

class Playlist extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className='playlist'>
        <Header isLogin={this.props.isLogin} isAdmin={this.props.isAdmin}/>
        <div className='wrapper'>
          <Album/>
          <div className='btns'>
            <div>播放</div>
            <div>收藏</div>
          </div>
          <SongList/>
        </div>
      </div>
    )
  }
}

class Album extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className='album-cover'>
        <div>
          <img src='https://dailymix-images.scdn.co/v1/img/0e2625a74c704f5c7d8cfe3c8b744afa6d966445/1/zh/default'></img>
        </div>
        <div className='inform'>
          <div>播放清單</div>
          <div>抒情好歌</div>
          <div>1小時30分</div>
        </div>
      </div>
    )
  }
}
class SongList extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <div className='list'>
        <Song />
        <Song />
        <Song />
        <Song />
        <Song />
        <Song />
        <Song />
      </div>
    )
  }
}
class Song extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <div className='song'>
        <div className='song-left'>
          <div className='play-btn'>*</div>
          <div className='song-inform'>
            <div className='song-name'>夜曲</div>
            <div className='singer'>
              <div>周杰倫</div>
              <div>．</div>
              <div>依然范特西</div>
            </div>
          </div>
        </div>
        <div className='song-right'>
          3:43
        </div>
      </div>
    )
  }
}
export { Playlist }
