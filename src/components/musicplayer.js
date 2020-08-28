import React from 'react';
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { db, firebase, storage } from '../static/js/firebase'
import Lyricplayer from './lyricsPlayer'

class MusicPlayer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      playState: false,
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
    this.play = this.play.bind(this)
    this.clickNext = this.clickNext.bind(this)
    this.clickPrevious = this.clickPrevious.bind(this)
    this.clickRamdom = this.clickRamdom.bind(this)
    this.clickLoop = this.clickLoop.bind(this)
    this.goBack = this.goBack.bind(this)
    this.clickLyric = this.clickLyric.bind(this)

    //mobile
    this.clickMobilePlayer = this.clickMobilePlayer.bind(this)
    this.clickMobilebar = this.clickMobilebar.bind(this)
    this.mobileMouseUp = this.mobileMouseUp.bind(this)
    this.mobileMouseMove = this.mobileMouseMove.bind(this)
    this.mobileMouseDown = this.mobileMouseDown.bind(this)
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
      let isNormalState = (playMode === 'normal')
      let isLoopState = (playMode === 'loop')
      let isLastSong = (playIndex == (songs.length - 1))

      if (isLastSong && isNormalState) {
        this.setState((currentState) => {
          let newState = {
            ...currentState,
            playState: false
          }
          return newState
        })
      }
      if (!isLastSong && isNormalState) {
        this.clickNext()
      }
      if (!isLastSong && isLoopState) {
        this.clickNext()
        return
      }
      if (isLastSong && isLoopState) {
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
            playState: true,
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
            playState: true,
          }
          return newState
        })
        audio.play()
      }
    }
  }
  render() {
    let audio = this.audio.current
    let { currentTime, playMode, randomIndex, mobilePlayerState, mobileBarState, playState } = this.state
    let { playlist, changePlayQueue, playQueueState } = this.props

    currentTime = this.changeCurrentTimeFormat(currentTime)

    let data__mobilebar = {
      function: {
        clickMobilebar: this.clickMobilebar
      }
    }
    let data__playing__bar = {
      function: {
        clickMobilePlayer: this.clickMobilePlayer,
      },
      childData: {
        left__controller: {
          function: {
            clickMobilePlayer: this.clickMobilePlayer,
          },
          state: {
            playMode,
            playlist,
            randomIndex,
            playQueueState,
          }
        },
        center__controllers: {
          function: {
            play: this.play,
            clickNext: this.clickNext,
            clickPrevious: this.clickPrevious,
            clickRamdom: this.clickRamdom,
            clickMobilePlayer: this.clickMobilePlayer,
            clickLoop: this.clickLoop,
          },
          state: {
            playState,
            playMode,
          },
          childData: {
            data__progressbar: {
              ref: {
                timeline: this.timeline,
                handle: this.handle,
                runningTime: this.runningTime,
                mobile__timeline: this.mobile__timeline,
                mobile__handle: this.mobile__handle,
                mobile__runningTime: this.mobile__runningTime

              },
              function: {
                mouseMove: this.mouseMove,
                mouseDown: this.mouseDown,
                mobileMouseMove: this.mobileMouseMove,
                mobileMouseDown: this.mobileMouseDown,
              },
              state: {
                playlist,
                playMode,
                currentTime,
                randomIndex
              }
            }
          }
        },
        right__contorllers: {
          function: {
            changePlayQueue,
            goBack: this.goBack
          },
          childData: {
            data__volume__controls: {
              function: {
                volumeMove: this.volumeMove,
                mouseDownVolume: this.mouseDownVolume,
              },
              ref: {
                volume: this.volume,
                volume__line: this.volume__line,
                handle__volume: this.handle__volume,
              }
            }
          },
          state: {
            playQueueState,
          }
        } 
      }
    }
    if (audio == null) {
      return (
        <div className='musicplayer'>
          <audio src='' ref={this.audio}/>
          <div className='player-container'>
            <MobileBar data={data__mobilebar} />
            <NowPlayingBar data={data__playing__bar} device={'web'}/>
          </div>
          <div className='mobile-player'>
            <img src='' className='background'></img>
            <NowPlayingBar data={data__playing__bar} device={'mobile'}/>
          </div>
        </div>
      )
    }
    else {
      let { playlist } = this.props
      let { songs, playIndex, photoUrl } = playlist[0]
      let isNormalMode = (playMode === 'normal')
      let isLoopMode = (playMode === 'loop')
      let playNormal = songs[playIndex].songUrl
      let playRandom = songs[randomIndex].songUrl

      return (
        <div className='musicplayer'>
          <audio src={isNormalMode || isLoopMode ? playNormal : playRandom} ref={this.audio} autoPlay={playState? true:false} />
          {/* <Lyricplayer clickLyric={this.clickLyric}/> 
          可以用 scrollTop 操作 或者改變 scroll css */}
          <div className={mobileBarState ? 'player-container' : 'player-container-closed'}>
            <MobileBar data={data__mobilebar} />
            <NowPlayingBar data={data__playing__bar} device={'web'}/>
          </div>
          <div className={mobilePlayerState ? 'mobile-player' : 'mobile-player-closed'}>
            <img src={photoUrl} className='background'></img>
            <NowPlayingBar data={data__playing__bar} device={'mobile'}/>
          </div>
        </div>
      )
    }
  }
  play() {
    let audio = this.audio.current
    if (this.state.playState) {
      this.setState((currentState) => {
        let newState = {
          ...currentState,
          playState: false
        }
        return newState
      })
      audio.pause()
    } else {
      this.setState((currentState) => {
        let newState = {
          ...currentState,
          playState: true
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
          playState: true
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
          playState: true
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
        playState: true,
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
  changeCurrentTimeFormat(currentTime) {
    if (currentTime === 0 || currentTime === null || currentTime === '' || currentTime === true || currentTime === false) {
      currentTime = '0:00'
      return currentTime
    }
    else if (currentTime < 10) {
      currentTime = '0:0' + currentTime
      return currentTime
    }
    else if (currentTime >= 10 && currentTime < 60) {
      currentTime = '0:' + currentTime
      return currentTime
    }
    else {
      let seconds = Math.floor(currentTime % 60)
      if (seconds < 10) seconds = '0' + seconds
      currentTime = Math.floor(currentTime / 60).toString() + ':' + seconds
      return currentTime
    }
  }
  clickLyric(e) {
    let audio = this.audio.current
    let value = e.target.getAttribute('time')
    audio.currentTime = value
  }
}
class MobileBar extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    let { clickMobilebar } = this.props.data.function
    return (
      <div className='mobile-bar'>
        <div className='show' onClick={clickMobilebar}><i className="fas fa-angle-left"></i></div>
        <div className='playing'><i className="fas fa-music"></i></div>
        <div className='hide' onClick={clickMobilebar}><i className="fas fa-angle-right"></i></div>
      </div>
    )
  }
}
class PlayerLeftController extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    let { data, device } = this.props
    let { clickMobilePlayer } = data.function
    let { playMode, playlist, randomIndex } = data.state
    let isWeb = (device === 'web')
    let isMobile = (device === 'mobile')
    let hasData = (playlist.length>0)
    
    if (hasData) {
      let { photoUrl, songs, playIndex } = playlist[0]
      let isNormalMode = (playMode === 'normal')
      let isLoopMode = (playMode === 'loop')
      let song__normal = songs[playIndex].name
      let song__random = songs[randomIndex].name
      let singer__normal = songs[playIndex].singer
      let singer__random = songs[randomIndex].singer

      if (isWeb) {
        return (
          <div className='now-playing-bar__left' onClick={clickMobilePlayer}>
            <div className='container'>
              <div className='album'>
                <img src={photoUrl} />
              </div>
              <div className='song-inform'>
                <div className='name'>{isNormalMode || isLoopMode ? song__normal : song__random}</div>
                <div className='singer'>{isNormalMode || isLoopMode ? singer__normal : singer__random}</div>
              </div>
              <div className='like-btn'>
                {/* <i className="far fa-heart"></i> */}
              </div>
            </div>
          </div>
        )
      }
      if (isMobile) {
        return (
          <div className='now-playing-bar__left'>
            <div className='container'>
              <div className='album'>
                <img src={photoUrl} />
              </div>
              <div className='song-inform'>
                <div className='name'>{isNormalMode || isLoopMode ? song__normal : song__random}</div>
                <div className='singer'>{isNormalMode || isLoopMode ? singer__normal : singer__random}</div>
              </div>
              <div className='like-btn'>
                {/* <i className="far fa-heart"></i> */}
                <div className='waiting-list' onClick={clickMobilePlayer}>
                  <Link to='/musicqueue'>
                    <i className="fas fa-bars"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )
      } 
    }
    else {
      return (
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
              {/* <i className="far fa-heart"></i> */}
            </div>
          </div>
        </div>
      )
    }
  }
} 
class PlayerCenterController extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    let { data, device } = this.props
    let { play, clickRamdom, clickPrevious, clickNext, clickLoop } = data.function
    let { playState, playMode } = data.state
    let { data__progressbar } = data.childData
    let isRandomMode = (playMode === 'random')
    let isLoopMode = (playMode === 'loop')
    
    return (
      <div className='now-playing-bar__center'>
        <div className='container'>
          <div className='player-controls__btns'>
            <div onClick={clickRamdom}><i className={isRandomMode ? "fas fa-random green" : "fas fa-random"}></i></div>
            <div onClick={clickPrevious}><i className="fas fa-step-backward"></i></div>
            <div className='play-btn' onClick={play}><i className={!playState ? "far fa-play-circle" : "far fa-pause-circle"}></i></div>
            <div onClick={clickNext}><i className="fas fa-step-forward"></i></div>
            <div onClick={clickLoop}><i className={isLoopMode ? "fas fa-retweet green" : "fas fa-retweet"} ></i></div>
          </div>
          <ProgressBar data={data__progressbar} device={device} />
        </div>
      </div>
    )
  }
}
class PlayerRightController extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    let { data, device } = this.props
    let { data__volume__controls } = data.childData
    let { playQueueState } = data.state
    let { changePlayQueue, goBack } = data.function
    let isWeb = (device === 'web')
    let playQueueIsClosed = !playQueueState
    let playQueue = []

    if (playQueueIsClosed && isWeb) {
      playQueue = <Link to='/musicqueue' onClick={changePlayQueue}>
        <i className="fas fa-bars"></i>
      </Link>  
    }
    else {
      playQueue = <div onClick={goBack}>
        <i className="fas fa-bars"></i>
      </div>
    }
    if (isWeb) {
      return (
        <div className='now-playing-bar__right'>
          <div className='container'>
            {/* <div className='lyric'>
              <i class="fas fa-music"></i>
            </div> */}
            <div className='waiting-list'>
              {playQueue}
            </div>
            <PlayerVolumeController data={data__volume__controls} />
          </div>
        </div>
      )
    }
  }
} 
class NowPlayingBar extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    let { data, device } = this.props
    let { left__controller, center__controllers, right__contorllers } = data.childData
    let { clickMobilePlayer } = data.function
    let isWeb = (device === 'web')
    let isMobile = (device === 'mobile')

    if (isWeb) {
      return (
        <div className='now-playing-bar'>
          <PlayerLeftController data={left__controller} device={device} />
          <PlayerCenterController data={center__controllers} device={device} />
          <PlayerRightController data={right__contorllers} device={device} />
        </div>
      )
    }
    if (isMobile) {
      return (
        <div className='now-playing-bar'>
          <PlayerLeftController data={left__controller} device={'mobile'} />
          <PlayerCenterController data={center__controllers} device={'mobile'} />
          <div className='mobile-close-btn' onClick={clickMobilePlayer}><i className="fas fa-chevron-down"></i></div>
        </div>
      )
    }
  }
}
class ProgressBar extends React.Component {
  constructor(props){
    super(props)
  }
  render() {
    let { data } = this.props
    let { timeline, handle, runningTime, mobile__timeline, mobile__handle, mobile__runningTime } = data.ref
    let { mouseMove, mouseDown, mobileMouseDown, mobileMouseMove } = data.function
    let { playMode, playlist, currentTime, randomIndex } = data.state
    let { device } = this.props
    let isWeb = (device === 'web')
    let isMobile = (device === 'mobile')
    let hasData = playlist.length > 0
    if (isWeb && hasData) {
      let { songs, playIndex } = playlist[0]
      return (
        <div className='playback-bar'>
          <div className='progress-time'>{currentTime}</div>
          <div className='progress-bar'>
            <div className='container'>
              <div className='timeline' onClick={mouseMove} ref={timeline}>
                <div className='running-time' ref={runningTime}></div>
                <div className='handle' onMouseDown={mouseDown} ref={handle}></div>
              </div>
            </div>
          </div>
          <div className='song-length'>{playMode === 'normal' || playMode === 'loop' ? songs[playIndex].length : songs[randomIndex].length}</div>
        </div>
      )
    }
    if (isMobile && hasData) {
      let { songs, playIndex } = playlist[0]
      return (
        <div className='playback-bar'>
          <div className='progress-time'>{currentTime}</div>
          <div className='progress-bar'>
            <div className='container'>
              <div className='timeline' onClick={mobileMouseMove} ref={mobile__timeline}>
                <div className='running-time' ref={mobile__runningTime}></div>
                <div className='handle' onMouseDown={mobileMouseDown} ref={mobile__handle}></div>
              </div>
            </div>
          </div>
          <div className='song-length'>{playMode === 'normal' || playMode === 'loop' ? songs[playIndex].length : songs[randomIndex].length}</div>
        </div>
      )
    }
    if (isWeb) {
      return (
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
      )
    }
    if (isMobile) {
      return (
        <div className='playback-bar'>
          <div className='progress-time'>0:00</div>
          <div className='progress-bar'>
            <div className='container'>
              <div className='timeline' onClick={mobileMouseMove} ref={mobile__timeline}>
                <div className='running-time' ref={mobile__runningTime}></div>
                <div className='handle' onMouseDown={mobileMouseDown} ref={mobile__handle}></div>
              </div>
            </div>
          </div>
          <div className='song-length'>4:22</div>
        </div>
      )
    }
  }
}
class PlayerVolumeController extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    let { volumeMove, mouseDownVolume } = this.props.data.function
    let { volume, volume__line, handle__volume } = this.props.data.ref
    return (
      <div className='volume-bar'>
        <div className='volume-btn'>
          <i className="fas fa-volume-up"></i>
        </div>
        <div className='progress-bar'>
          <div className='container'>
            <div className='volume' onClick={volumeMove} ref={volume}>
              <div className='volume-line' ref={volume__line}></div>
              <div className='handle__volume' onMouseDown={mouseDownVolume} ref={handle__volume}></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
const timeFormat = MusicPlayer.prototype.changeCurrentTimeFormat
export { timeFormat, MobileBar, MusicPlayer as default }

