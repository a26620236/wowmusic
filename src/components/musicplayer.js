import React from 'react';
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class MusicPlayer extends React.Component {
  constructor(props) {
    super(props) 
  }
  render() {
    return (
      <div className='musicplayer'>
        <div className='now-playing-bar'>
          <div className='now-playing-bar__left'>
            <div className='container'>
              <div className='album'></div>
              <div className='song'></div>
              <div className='singer'></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MusicPlayer
