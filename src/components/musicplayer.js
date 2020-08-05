import React from 'react';
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { db, firebase, storage } from '../static/js/firebase'

class MusicPlayer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      play: false,
      currentTime: 0,
      playMode: 'normal',
      randomIndex: 0,
      mobilePlayerState: false,
      mobileBarState: true,
    }
    this.audio = React.createRef()
    this.timeline = React.createRef()
    this.mobile__timeline = React.createRef()
    this.handle = React.createRef()
    this.mobile__handle = React.createRef()
    this.volume = React.createRef()
    this.mobile__volume = React.createRef()
    this.handle__volume = React.createRef()
    this.mobile__handle__volume = React.createRef()
    this.runningTime = React.createRef()
    this.mobile__runningTime = React.createRef()
    this.volume__line = React.createRef()
    this.mouseUp = this.mouseUp.bind(this)
    this.mouseMove = this.mouseMove.bind(this)
    this.mouseDown = this.mouseDown.bind(this)
    this.volumeMove = this.volumeMove.bind(this)
    this.mouseUpVolume = this.mouseUpVolume.bind(this)
    this.mouseDownVolume = this.mouseDownVolume.bind(this)
    this.clickMobilebar = this.clickMobilebar.bind(this)
    //mobile
    this.mobileMouseUp = this.mobileMouseUp.bind(this)
    this.mobileMouseMove = this.mobileMouseMove.bind(this)
    this.mobileMouseDown = this.mobileMouseDown.bind(this)
    this.mobileVolumeMove = this.mobileVolumeMove.bind(this)
    this.mobileMouseUpVolume = this.mobileMouseUpVolume.bind(this)
    this.mobileMouseDownVolume = this.mobileMouseDownVolume.bind(this)
    this.play = this.play.bind(this)
    this.setRamdomState = this.setRamdomState.bind(this)
    this.setNormalState = this.setNormalState.bind(this)
  }
  componentDidMount() {
    let audio = this.audio.current
    let timeline = this.timeline.current
    let mobile__timeline = this.mobile__timeline.current
    audio.addEventListener("timeupdate", () => {
      let ratio = audio.currentTime / audio.duration;
      let position = (timeline.offsetWidth * ratio) 
      let mobile__position = (mobile__timeline.offsetWidth * ratio)
      
      this.positionHandle(position);
      this.mobilePositionHandle(mobile__position);
      this.setState((currentState) => {
        let newState = {
          ...currentState,
          currentTime: Math.floor(audio.currentTime),
        }
        return newState
      })
    })
    audio.addEventListener("ended", () => {
      let { songs, playIndex } = this.props.playlist[0]
      let { playLoop } = this.props
      let { playMode } = this.state

      if (playIndex == (songs.length - 1) && playMode === 'normal') {
        this.setState((currentState) => {
          let newState = {
            ...currentState,
            play: false
          }
          return newState
        })
      }
      if (playIndex < (songs.length - 1) && playMode === 'normal') {
        this.clickNext()
      }
      if (playIndex < (songs.length - 1) && playMode === 'loop') {
        this.clickNext()
        return
      }
      if (playIndex == (songs.length - 1) && playMode === 'loop') {
        playLoop()
        return
      }
    });
  }
  componentDidUpdate(prevProps) {
    let audio = this.audio.current
    let { playMode } = this.state
    let { firstLoad, changeFavorite, playQueueState } = this.props
    if (changeFavorite !== prevProps.changeFavorite || playQueueState !== prevProps.playQueueState) {
      return 
    }
    if (this.props !== prevProps && !firstLoad) {
      if (playMode == 'random') {
        this.setState((currentState) => {
          let newState = {
            ...currentState,
            play: true,
            playMode: 'normal',
          }
          return newState
        })
        audio.play()
      }
      else {
        this.setState((currentState) => {
          let newState = {
            ...currentState,
            play: true,
          }
          return newState
        })
        audio.play()
      }
    }
  }
  render() {
    let audio = this.audio.current
    let data__mobilebar = {
      clickMobilebar: this.clickMobilebar
    }
    if (audio == null) {
      return (
        <div className='musicplayer'> 
          <audio src='' ref={this.audio} />
          <div className='player-container'>
            <MobileBar data={data__mobilebar} />
            <div className='now-playing-bar'>
              <div className='now-playing-bar__left'>
                <div className='container'>
                  <div className='album'>
                    <img src="https://i.scdn.co/image/ab67616d000048513d0ffcf6ee624625158fa352" />
                  </div>
                  <div className='song-inform'>
                    <div className='name'>太陽</div>
                    <div className='singer'>邱振哲</div>
                  </div>
                  <div className='like-btn'>
                    <i className="far fa-heart"></i>
                  </div>
                </div>
              </div>
              <div className='now-playing-bar__center'>
                <div className='container'>
                  <div className='player-controls__btns'>
                    <div><i className="fas fa-random"></i></div>
                    <div><i className="fas fa-step-backward"></i></div>
                    <div onClick={this.play}><i className={!this.state.play ? "far fa-play-circle" : "far fa-pause-circle"}></i></div>
                    <div onClick={this.clickNext.bind(this)}><i className="fas fa-step-forward"></i></div>
                    <div><i className="fas fa-retweet"></i></div>
                  </div>
                  <div className='playback-bar'>
                    <div className='progress-time'>0:00</div>
                    <div className='progress-bar'>
                      <div className='container'>
                        <div className='timeline' onClick={this.mouseMove} ref={this.timeline}>
                          <div className='running-time' ref={this.runningTime}></div>
                          <div className='handle' onMouseDown={this.mouseDown} ref={this.handle}></div>
                        </div>
                      </div>
                    </div>
                    <div className='song-length'>4:22</div>
                  </div>
                </div>
              </div>
              <div className='now-playing-bar__right'>
                <div className='container'>
                  <div className='waiting-list'>
                    <Link to='/musicqueue'>
                      <i className="fas fa-bars"></i>
                    </Link>
                  </div>
                  <div className='volume-bar'>
                    <div className='volume-btn'>
                      <i className="fas fa-volume-up"></i>
                    </div>
                    <div className='progress-bar'>
                      <div className='container'>
                        <div className='volume' onClick={this.volumeMove} ref={this.volume}>
                          <div className='handle__volume' onMouseDown={this.mouseDownVolume} ref={this.handle__volume}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> 
          <div className='mobile-player'>
            <img src='' className='background'></img>
            <div className='now-playing-bar'>
              <div className='now-playing-bar__left'>
                <div className='container'>
                  <div className='album'>
                    <img src='' />
                  </div>
                  <div className='song-inform'>
                    <div className='name'></div>
                    <div className='singer'></div>
                  </div>
                  <div className='like-btn'>
                    <i className="far fa-heart"></i>
                    <div className='waiting-list' onClick={this.clickMobilePlayer.bind(this)}>
                      <Link to='/musicqueue'>
                        <i className="fas fa-bars"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className='now-playing-bar__center'>
                <div className='container'>
                  <div className='player-controls__btns'>
                    <div onClick={this.clickRamdom.bind(this)}><i className="fas fa-random"></i></div>
                    <div onClick={this.clickPrevious.bind(this)}><i className="fas fa-step-backward"></i></div>
                    <div className='play-btn' onClick={this.play}><i className={!this.state.play ? "far fa-play-circle" : "far fa-pause-circle"}></i></div>
                    <div onClick={this.clickNext.bind(this)}><i className="fas fa-step-forward"></i></div>
                    <div onClick={this.clickLoop.bind(this)}><i className="fas fa-retweet"></i></div>
                  </div>
                  <div className='playback-bar'>
                    <div className='progress-time'></div>
                    <div className='progress-bar'>
                      <div className='container'>
                        <div className='timeline' onClick={this.mobileMouseMove} ref={this.mobile__timeline}>
                          <div className='handle' onMouseDown={this.mobileMouseDown} ref={this.mobile__handle}></div>
                        </div>
                      </div>
                    </div>
                    <div className='song-length'></div>
                  </div>
                </div>
              </div>
              <div className='now-playing-bar__right'>
                <div className='container'>
                  <div className='waiting-list'>
                    <Link to='/musicqueue'>
                      <i className="fas fa-bars"></i>
                    </Link>
                  </div>
                  <div className='volume-bar'>
                    <div className='volume-btn'>
                      <i className="fas fa-volume-up"></i>
                    </div>
                    <div className='progress-bar'>
                      <div className='container'>
                        <div className='volume' onClick={this.mobileVolumeMove} ref={this.mobile__volume}>
                          <div className='handle__volume' onMouseDown={this.mobileMouseDownVolume} ref={this.mobile__handle__volume}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='mobile-close-btn' onClick={this.clickMobilePlayer.bind(this)}><i className="fas fa-chevron-down"></i></div>
            </div>
          </div>
        </div>
      )
    }
    else {
      let { currentTime, playMode, randomIndex, mobilePlayerState, mobileBarState, play } = this.state
      let { playlist, changePlayQueue, playQueueState } = this.props
      let { songs, playIndex, photoUrl } = playlist[0]

      if (currentTime === 0) {
        currentTime = '0:00'
      }
      else if (currentTime < 10) {
        currentTime = '0:0' + currentTime
      }
      else if (currentTime >= 10 && currentTime < 60) {
        currentTime = '0:' + currentTime
      }
      else {
        let seconds = Math.floor(currentTime % 60)
        if (seconds < 10) seconds = '0' + seconds
        currentTime = Math.floor(currentTime / 60).toString() + ':' + seconds
      }
      let playQueue = []
      if (!playQueueState) {
        playQueue = <Link to='/musicqueue' onClick={changePlayQueue}>
          <i className="fas fa-bars"></i>
        </Link>
      }
      else {
        playQueue = <div onClick={this.goBack.bind(this)}>
          <i className="fas fa-bars"></i>
        </div>
      }
      return (
        <div className='musicplayer'>
          <audio src={playMode === 'normal' || playMode === 'loop' ? songs[playIndex].songUrl : songs[randomIndex].songUrl} ref={this.audio} autoPlay={play? true:false} />
          <div className={mobileBarState ? 'player-container' : 'player-container-closed'}>
            <MobileBar data={data__mobilebar} />
            <div className='now-playing-bar'>
              <div className='now-playing-bar__left' onClick={this.clickMobilePlayer.bind(this)}>
                <div className='container'>
                  <div className='album'>
                    <img src={photoUrl} />
                  </div>
                  <div className='song-inform'>
                    <div className='name'>{playMode === 'normal' || playMode === 'loop'? songs[playIndex].name : songs[randomIndex].name}</div>
                    <div className='singer'>{playMode === 'normal' || playMode === 'loop' ? songs[playIndex].singer : songs[randomIndex].singer}</div>
                  </div>
                  <div className='like-btn'>
                    <i className="far fa-heart"></i>
                  </div>
                </div>
              </div>
              <div className='now-playing-bar__center'>
                <div className='container'>
                  <div className='player-controls__btns'>
                    <div onClick={this.clickRamdom.bind(this)}><i className={playMode === 'random' ? "fas fa-random green" : "fas fa-random"}></i></div>
                    <div onClick={this.clickPrevious.bind(this)}><i className="fas fa-step-backward"></i></div>
                    <div className='play-btn' onClick={this.play}><i className={!this.state.play ? "far fa-play-circle" : "far fa-pause-circle"}></i></div>
                    <div onClick={this.clickNext.bind(this)}><i className="fas fa-step-forward"></i></div>
                    <div onClick={this.clickLoop.bind(this)}><i className={playMode === 'loop' ? "fas fa-retweet green" : "fas fa-retweet"} ></i></div>
                  </div>
                  <div className='playback-bar'>
                    <div className='progress-time'>{currentTime}</div>
                    <div className='progress-bar'>
                      <div className='container'>
                        <div className='timeline' onClick={this.mouseMove} ref={this.timeline}>
                          <div className='running-time' ref={this.runningTime}></div>
                          <div className='handle' onMouseDown={this.mouseDown} ref={this.handle}></div>
                        </div>
                      </div>
                    </div>
                    <div className='song-length'>{playMode === 'normal' || playMode === 'loop' ? songs[playIndex].length : songs[randomIndex].length}</div>
                  </div>
                </div>
              </div>
              <div className='now-playing-bar__right'>
                <div className='container'>
                  <div className='waiting-list'>
                    {playQueue}
                  </div>
                  <div className='volume-bar'>
                    <div className='volume-btn'>
                      <i className="fas fa-volume-up"></i>
                    </div>
                    <div className='progress-bar'>
                      <div className='container'>
                        <div className='volume' onClick={this.volumeMove} ref={this.volume}>
                          <div className='volume-line' ref={this.volume__line}></div>
                          <div className='handle__volume' onMouseDown={this.mouseDownVolume} ref={this.handle__volume}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={mobilePlayerState ? 'mobile-player' : 'mobile-player-closed'}>
            <img src={photoUrl} className='background'></img>
            <div className='now-playing-bar'>
              <div className='now-playing-bar__left'>
                <div className='container'>
                  <div className='album'>
                    <img src={photoUrl} />
                  </div>
                  <div className='song-inform'>
                    <div className='name'>{playMode === 'normal' || playMode === 'loop' ? songs[playIndex].name : songs[randomIndex].name}</div>
                    <div className='singer'>{playMode === 'normal' || playMode === 'loop' ? songs[playIndex].singer : songs[randomIndex].singer}</div>
                  </div>
                  <div className='like-btn'>
                    <i className="far fa-heart"></i>
                    <div className='waiting-list' onClick={this.clickMobilePlayer.bind(this)}>
                      <Link to='/musicqueue'>
                        <i className="fas fa-bars"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className='now-playing-bar__center'>
                <div className='container'>
                  <div className='player-controls__btns'>
                    <div onClick={this.clickRamdom.bind(this)}><i className={playMode === 'random' ? "fas fa-random green" : "fas fa-random"}></i></div>
                    <div onClick={this.clickPrevious.bind(this)}><i className="fas fa-step-backward"></i></div>
                    <div className='play-btn' onClick={this.play}><i className={!this.state.play ? "far fa-play-circle" : "far fa-pause-circle"}></i></div>
                    <div onClick={this.clickNext.bind(this)}><i className="fas fa-step-forward"></i></div>
                    <div onClick={this.clickLoop.bind(this)}><i className={playMode === 'loop' ? "fas fa-retweet green" : "fas fa-retweet"}></i></div>
                  </div>
                  <div className='playback-bar'>
                    <div className='progress-time'>{currentTime}</div>
                    <div className='progress-bar'>
                      <div className='container'>
                        <div className='timeline' onClick={this.mobileMouseMove} ref={this.mobile__timeline}>
                          <div className='running-time' ref={this.mobile__runningTime}></div>
                          <div className='handle' onMouseDown={this.mobileMouseDown} ref={this.mobile__handle}></div>
                        </div>
                      </div>
                    </div>
                    <div className='song-length'>{playMode === 'normal' || playMode === 'loop' ? songs[playIndex].length : songs[randomIndex].length}</div>
                  </div>
                </div>
              </div>
              <div className='now-playing-bar__right'>
                <div className='container'>
                  <div className='waiting-list' onClick={this.clickMobilePlayer.bind(this)}>
                    <Link to='/musicqueue'>
                      <i className="fas fa-bars"></i>
                    </Link>
                  </div>
                  <div className='volume-bar'>
                    <div className='volume-btn'>
                      <i className="fas fa-volume-up"></i>
                    </div>
                    <div className='progress-bar'>
                      <div className='container'>
                        <div className='volume' onClick={this.mobileVolumeMove} ref={this.mobile__volume}>
                          <div className='handle__volume' onMouseDown={this.mobileMouseDownVolume} ref={this.mobile__handle__volume}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className='mobile-close-btn' onClick={this.clickMobilePlayer.bind(this)}><i className="fas fa-chevron-down"></i></div>
            </div>
          </div>
        </div>
      )
    }
  }
  play() {
    let audio = this.audio.current
    if (this.state.play) {
      this.setState((currentState) => {
        let newState = {
          ...currentState,
          play: false
        }
        return newState
      })
      audio.pause()
    } else {
      this.setState((currentState) => {
        let newState = {
          ...currentState,
          play: true
        }
        return newState
      })
      audio.play()
    }
  }
  positionHandle(position) {
    let runningTime = this.runningTime.current
    let timeline = this.timeline.current
    let handle = this.handle.current
    let timelineWidth = timeline.offsetWidth - handle.offsetWidth
    let handleLeft = position
    
    if (handleLeft > 0 && handleLeft <= timelineWidth) {
      handle.style.marginLeft = handleLeft + 'px'
      runningTime.style.width = handleLeft + 'px'
    }
    if (handleLeft < 0) {
      handle.style.marginLeft = '0px'
      runningTime.style.width = '0px'
    }
    if (handleLeft > timelineWidth) {
      handle.style.marginLeft = timelineWidth + 'px'
      runningTime.style.width = timelineWidth + 'px'
    }
  }
  volumeHandle(position) {
    let volume__line = this.volume__line.current
    let volume = this.volume.current
    let volumeLeft = volume.getBoundingClientRect()
    let handle__volume = this.handle__volume.current
    let volumeWidth = volume.offsetWidth - handle__volume.offsetWidth
    let handle__volumeLeft = position - volumeLeft.left
    
    if (handle__volumeLeft > 0 && handle__volumeLeft <= volumeWidth) {
      handle__volume.style.marginRight = (volumeWidth - handle__volumeLeft + 12) + 'px'
      volume__line.style.width = handle__volumeLeft + 'px'
    }
    if (handle__volumeLeft < 0) {
      handle__volume.style.marginRight = volumeWidth + 'px'
      volume__line.style.width = '0px'
    }
    if (handle__volumeLeft > volumeWidth) {
      handle__volume.style.marginRight = '0px'
      volume__line.style.width = (volumeWidth + 12) + 'px'
    }
  }
  volumeMove(e) {
    let audio = this.audio.current
    let volume = this.volume.current
    let volumeLeft = volume.getBoundingClientRect()

    this.volumeHandle(e.pageX)
    let sound = ((e.pageX - volumeLeft.left) / volume.offsetWidth).toFixed(1)
    if (sound <= 1) {
      audio.volume = sound
    }
    else {
      audio.volume = 1
    }
  }
  mouseMove(e) {
    let audio = this.audio.current
    let timeline = this.timeline.current
    let timelineLeft = timeline.getBoundingClientRect()
    
    audio.currentTime = ((e.pageX - timelineLeft.left) / timeline.offsetWidth) * audio.duration
  }
  mouseUp(e) {
    window.removeEventListener('mousemove', this.mouseMove);
    window.removeEventListener('mouseup', this.mouseUp);
  };
  mouseDown(e) {
    window.addEventListener('mousemove', this.mouseMove);
    window.addEventListener('mouseup', this.mouseUp);
  };
  mouseUpVolume(e) {
    window.removeEventListener('mousemove', this.volumeMove);
    window.removeEventListener('mouseup', this.mouseUpVolume);
  }
  mouseDownVolume(e) {
    window.addEventListener('mousemove', this.volumeMove);
    window.addEventListener('mouseup', this.mouseUpVolume);
  }
  // mobile
  mobilePositionHandle(position) {
    let mobile__runningTime = this.mobile__runningTime.current
    let mobile__timeline = this.mobile__timeline.current
    let mobile__handle = this.mobile__handle.current
    let mobile__timelineWidth = mobile__timeline.offsetWidth - mobile__handle.offsetWidth
    let mobile__handleLeft = position 

    if (mobile__handleLeft > 0 && mobile__handleLeft <= mobile__timelineWidth) {
      mobile__handle.style.marginLeft = mobile__handleLeft + 'px'
      mobile__runningTime.style.width = mobile__handleLeft + 'px'
    }
    if (mobile__handleLeft < 0) {
      mobile__handle.style.marginLeft = '0px'
      mobile__runningTime.style.width = '0px'
    }
    if (mobile__handleLeft > mobile__timelineWidth) {
      mobile__handle.style.marginLeft = mobile__timelineWidth + 'px'
      mobile__runningTime.style.width = mobile__timelineWidth + 'px'
    }
  }
  mobileVolumeHandle(position) {
    let mobile__volume = this.mobile__volume.current
    let mobile__volumeLeft = mobile__volume.getBoundingClientRect()
    let mobile__handle__volume = this.mobile__handle__volume.current
    let volumeWidth = mobile__volume.offsetWidth - mobile__handle__volume.offsetWidth
    let mobile__handle__volumeLeft = position - mobile__volumeLeft.left

    if (mobile__handle__volumeLeft > 0 && mobile__handle__volumeLeft <= volumeWidth) {
      mobile__handle__volume.style.marginRight = (volumeWidth - mobile__handle__volumeLeft + 12) + 'px'
    }
    if (mobile__handle__volumeLeft < 0) {
      mobile__handle__volume.style.marginRight = volumeWidth + 'px'
    }
    if (mobile__handle__volumeLeft > volumeWidth) {
      mobile__handle__volume.style.marginRight = '0px'
    }
  }
  mobileVolumeMove(e) {
    let audio = this.audio.current
    let mobile__volume = this.mobile__volume.current
    let mobile__volumeLeft = mobile__volume.getBoundingClientRect()

    this.mobileVolumeHandle(e.pageX)
    let sound = ((e.pageX - mobile__volumeLeft.left) / mobile__volume.offsetWidth).toFixed(1)
    if (sound <= 1) {
      audio.volume = sound
    }
    else {
      audio.volume = 1
    }
  }
  mobileMouseMove(e) {
    let audio = this.audio.current
    let mobile__timeline = this.mobile__timeline.current
    let mobile__timelineLeft = mobile__timeline.getBoundingClientRect()

    audio.currentTime = ((e.pageX - mobile__timelineLeft.left) / mobile__timeline.offsetWidth) * audio.duration
  }
  mobileMouseUp(e) {
    window.removeEventListener('mousemove', this.mobileMouseMove);
    window.removeEventListener('mouseup', this.mobileMouseUp);
  };
  mobileMouseDown(e) {
    window.addEventListener('mousemove', this.mobileMouseMove);
    window.addEventListener('mouseup', this.mobileMouseUp);
  };
  mobileMouseUpVolume(e) {
    window.removeEventListener('mousemove', this.mobileVolumeMove);
    window.removeEventListener('mouseup', this.mobileMouseUpVolume);
  }
  mobileMouseDownVolume(e) {
    window.addEventListener('mousemove', this.mobileVolumeMove);
    window.addEventListener('mouseup', this.mobileMouseUpVolume);
  }
  clickNext() {
    let { playNext } = this.props
    let { playMode } = this.state
    let { songs, playIndex } = this.props.playlist[0]
    if (playMode == 'random') {
      this.setRamdomState()
      return
    }
    if (playIndex < (songs.length - 1)) {
      playNext()
      this.setState((currentState) => {
        let newState = {
          ...currentState,
          play: true
        }
        return newState
      })
    }
  }
  clickPrevious() {
    let { playPrevious } = this.props
    let { playMode } = this.state
    let { playIndex } = this.props.playlist[0]
    if (playMode == 'random') {
      this.setRamdomState()
      return
    }
    if (playIndex > 0) {
      playPrevious()
      this.setState((currentState) => {
        let newState = {
          ...currentState,
          play: true
        }
        return newState
      })
    }
  }
  clickLoop() {
    let { playMode } = this.state
    let audio = this.audio.current
    if (playMode !== 'loop') {
      audio.removeEventListener("ended", this.setNormalState)
      audio.removeEventListener("ended", this.setRamdomState)
      this.setState((currentState) => {
        let newState = {
          ...currentState,
          playMode: 'loop',
          randomIndex: 0
        }
        return newState
      })
    }
    if (playMode === 'loop') {
      audio.addEventListener("ended", this.setNormalState)
      this.setState((currentState) => {
        let newState = {
          ...currentState,
          playMode: 'normal',
          randomIndex: 0
        }
        return newState
      })
    }
  }
  clickRamdom() {
    let { playMode } = this.state
    let audio = this.audio.current

    if (playMode !== 'random') {
      audio.removeEventListener("ended", this.setNormalState)
      audio.addEventListener("ended", this.setRamdomState)
      this.setState((currentState) => {
        let newState = {
          ...currentState,
          playMode: 'random'
        }
        return newState
      })
    }
    if (playMode === 'random') {
      audio.removeEventListener("ended", this.setRamdomState)
      audio.addEventListener("ended", this.setNormalState)
      this.setState((currentState) => {
        let newState = {
          ...currentState,
          playMode: 'normal',
          randomIndex: 0
        }
        return newState
      })
    }
  }
  setRamdomState() {
    let { songs } = this.props.playlist[0]
    let { randomIndex } = this.state
    let setIndex = Math.floor(Math.random() * songs.length)

    while (setIndex == randomIndex) {
      setIndex = Math.floor(Math.random() * songs.length)
    }
    this.setState((currentState) => {
      let newState = {
        ...currentState,
        randomIndex: setIndex,
        play: true,
      }
      return newState
    })
  }
  setNormalState() {
    this.setState((currentState) => {
      let newState = {
        ...currentState,
        playMode: 'normal',
        randomIndex: 0
      }
      return newState
    })
  }
  clickMobilePlayer() {
    this.setState((currentState) => {
      let newState = {
        ...currentState,
        mobilePlayerState: !currentState.mobilePlayerState
      }
      return newState
    })
  }
  clickMobilebar() {
    this.setState((currentState) => {
      let newState = {
        ...currentState,
        mobileBarState: !currentState.mobileBarState
      }
      return newState
    })
  }
  goBack() {
    let { changePlayQueue } = this.props
    changePlayQueue()
    let history = window.history
    history.back()
  }
}
class MobileBar extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    let { clickMobilebar } = this.props.data
    return (
      <div className='mobile-bar'>
        <div className='show' onClick={clickMobilebar}><i className="fas fa-angle-left"></i></div>
        <div className='playing'><i className="fas fa-music"></i></div>
        <div className='hide' onClick={clickMobilebar}><i className="fas fa-angle-right"></i></div>
      </div>
    )
  }
}
class CenterController extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    let { play, clickMobilePlayer, clickRamdom, clickPrevious, clickNext, clickLoop, mouseMove, mouseDown, volumeMove, mouseDownVolume } = this.props.data.function
    let { playState, playMode, currentTime } = this.props.data.state
    let { timeline, runningTime, handle, volume, volume__line, handle__volume } = this.props.data.ref
    return (
      <div className='now-playing-bar__center'>
        <div className='container'>
          <div className='player-controls__btns'>
            <div><i className="fas fa-random"></i></div>
            <div><i className="fas fa-step-backward"></i></div>
            <div onClick={play}><i className={!playState ? "far fa-play-circle" : "far fa-pause-circle"}></i></div>
            <div onClick={clickNext}><i className="fas fa-step-forward"></i></div>
            <div><i className="fas fa-retweet"></i></div>
          </div>
          <div className='playback-bar'>
            <div className='progress-time'>0:00</div>
            <div className='progress-bar'>
              <div className='container'>
                <div className='timeline' onClick={mouseMove} ref={timeline}>
                  <div className='running-time' ref={runningTime}></div>
                  <div className='handle' onMouseDown={mouseDown} ref={handle}></div>
                </div>
              </div>
            </div>
            <div className='song-length'>4:22</div>
          </div>
        </div>
      </div>
    )
  }
}


export default MusicPlayer
