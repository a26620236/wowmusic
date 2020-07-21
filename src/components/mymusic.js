import React from 'react';
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './header-normal'
import AlbumCard from './albumCard'
import { db, firebase, storage } from '../static/js/firebase'

class MyMusic extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      albumList: [],
    }
  }
  componentDidMount() {
    let { user } = this.props
    let albumList = []
    if (user.uid) {
      db.collection('users').doc(user.uid).collection('favorite').get().then((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
          albumList.push(doc.data())
        });
        this.setState((currentState) => {
          let newState = {
            ...currentState,
            albumList,
          }
          return newState
        })
      });
    }
  }
  render() {
    let { isLogin, isAdmin, user } = this.props
    let { albumList } = this.state
    if (albumList.length > 0) {
      return (
        <div className='mymusic'>
          <Header isLogin={isLogin} isAdmin={isAdmin} user={user}/>
          <div className='mymusic-wrapper'>
            <div className='banner'>我的收藏</div>
            <div className='wrapper__background'>
              <div className='title'>播放清單</div>
              <div className='items'>
                {albumList.map((e, index) => {
                  return <AlbumCard data={e.album} key={index} />
                })}
              </div>
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
}
export default MyMusic
