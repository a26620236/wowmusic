import React from 'react';
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './headerNormal'
import { SongList, Song } from './playlist'
import { db, firebase, storage } from '../static/js/firebase'

class MusicQueue extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    let { isLogin, isAdmin, playlist, user } = this.props
    let { playIndex } = playlist[0]
    return (
      <div className='musicqueue'>
        <Header isLogin={isLogin} isAdmin={isAdmin} user={user}/>
        <div className='queue-wrapper'>
          <div className='queue-title'>播放佇列</div>
          <div className='now-playing'>
            <div className='now-playing-header'>
              現在播放
            </div>
            <div className='now-playing-body'>
              <Song data={playlist[0].songs[playIndex]}></Song>
            </div>
          </div>
          <div className='next'>
            <div className='next-header'>
              播放專輯 : {playlist[0].name}
            </div>
            <div className='next-body'>
              <SongList data={playlist[0].songs} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MusicQueue
