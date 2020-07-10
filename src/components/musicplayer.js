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
    this.state = {
      play: false,
    }
    this.audio = React.createRef()
  }
  componentDidUpdate() {
    this.setState((currentState) => {
      let newState = {
        ...currentState,
        play: true
      }
      return newState
    })
  }
  render() {
    return (
      <div className='musicplayer'>
        <audio src='https://firebasestorage.googleapis.com/v0/b/wowmusic-310c5.appspot.com/o/mp3%2F%E9%82%A3%E5%A5%B3%E5%AD%A9%E5%B0%8D%E6%88%91%E8%AA%AA?alt=media&token=330c3824-9bbc-4f05-a876-2904f4666121' ref={this.audio}/>
        <div className='now-playing-bar'>
          <div className='now-playing-bar__left'>
            <div className='container'>
              <div className='album'>
                <img src="https://i.scdn.co/image/ab67616d000048513d0ffcf6ee624625158fa352"/>
              </div>
              <div className='song-inform'>
                <div className='name'>太陽</div>
                <div className='singer'>邱振哲</div>
              </div>
              <div className='like-btn'>
                <i class="far fa-heart"></i>
              </div>
            </div>
          </div>
          <div className='now-playing-bar__center'>
            <div className='container'>
              <div className='player-controls__btns'>
                <div><i class="fas fa-random"></i></div>
                <div><i class="fas fa-step-backward"></i></div>
                <div><i class="far fa-play-circle"></i></div>
                <div><i class="fas fa-step-forward"></i></div>
                <div><i class="fas fa-retweet"></i></div>
              </div>
              <div className='playback-bar'>
                <div className='progress-time'>0:00</div>
                <div className='progress-bar'>
                  <div className='container'>
                    <div className='timeline'>
                      <div className='handle'></div>
                    </div>
                    {/* <button></button> */}
                  </div>
                </div>
                <div className='song-length'>4:22</div>
              </div>
            </div>
          </div>
          <div className='now-playing-bar__right'>
            <div className='container'>
              <div className='waiting-list'>
                <i class="fas fa-bars"></i>
              </div>
              <div className='volume-bar'>
                <div className='volume-btn'>
                  <i class="fas fa-volume-up"></i>
                </div>
                <div className='progress-bar'>
                  <div className='container'>
                    <div className='progress-bar__left'></div>
                    <button></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  play() {
    if (this.state.play) {
      this.setState((currentState) => {
        let newState = {
          ...currentState,
          play: !currentState.play
        }
        return newState
      })
      this.audio.pause()
    } else {
      this.setState((currentState) => {
        let newState = {
          ...currentState,
          play: !currentState.play
        }
        return newState
      })
      this.audio.play()
    }
  }
}

export default MusicPlayer
