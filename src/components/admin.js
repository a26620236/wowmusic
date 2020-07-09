import React from 'react';
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { db, firebase, storage } from '../static/js/firebase'

class Admin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      playlist__name:'',
      playlist__category:'',
      playlist__desc:'',
      photo__file:'',
      select__playlist:'',
      song__album:'',
      song__name:'',
      song__singer:'',
      song__length:'',
      song__file:'',
    }
  }
  render() {
    return (
      <div className='admin'>
        <div className='albums'>
          <div className='list-header'>新增專輯</div>
          <div className='list-body'>
            <div className='wrapper'>
              <div className='album-inform'>
                <div className='inputbox'>
                  歌單名稱:
                  <input data-field='playlist__name' onChange={this.handleInput.bind(this)}></input>
                </div>
                <div className='inputbox'>
                  分類:
                  <input data-field='playlist__category' onChange={this.handleInput.bind(this)}></input>
                </div>
                <div className='inputbox'>
                  介紹:
                  <input data-field='playlist__desc' onChange={this.handleInput.bind(this)}></input>
                </div>
                <div className='inputbox'>
                  封面相片:
                  <input type='file' data-field='photo__file' onChange={this.handleInputFile.bind(this)}></input>
                </div>
                <div className='submit' onClick={this.addAlbum.bind(this)}>送出</div>
              </div>
            </div>
          </div>
        </div>
        <div className='songs'>
          <div className='list-header'>新增歌曲</div>
          <div className='list-body'>
            <div className='inputbox'>
              歌單名稱:
              <input data-field='select__playlist' onChange={this.handleInput.bind(this)}></input>
            </div>
            <div className='inputbox'>
              歌曲一:
              <input data-field='song__name' onChange={this.handleInput.bind(this)}></input>
            </div>
            <div className='inputbox'>
              演唱者:
              <input data-field='song__singer' onChange={this.handleInput.bind(this)}></input>
            </div>
            <div className='inputbox'>
              專輯名稱:
              <input data-field='song__album' onChange={this.handleInput.bind(this)}></input>
            </div>
            <div className='inputbox'>
              歌曲長度:
              <input data-field='song__length' onChange={this.handleInput.bind(this)}></input>
            </div>
            <div className='inputbox'>
              檔案:
              <input type='file' data-field='song__file' onChange={this.handleInputFile.bind(this)} ></input>
            </div>
            <div className='submit' onClick={this.addSong.bind(this)}>送出</div>
          </div>
        </div>
      </div>
    )
  }
  handleInput(e) {
    let field = e.target.getAttribute('data-field')
    let value = e.target.value
    this.setState((currentState) => {
      let newState = {
        ...currentState,
        [field]: value
      }
      return newState;
    })
  } 
  handleInputFile(e) {
    let field = e.target.getAttribute('data-field')
    let file = e.target.files
    this.setState((currentState) => {
      let newState = {
        ...currentState,
        [field]: file
      }
      return newState;
    })
  }
  addAlbum() {
    let name = this.state.playlist__name
    let category = this.state.playlist__category
    let desc = this.state.playlist__desc
    let upload = this.state.photo__file[0]
    let storageRef = firebase.storage().ref('photo/' + name)
    let photoUrl = ''
    db.collection('albums').doc(name).get().then((doc) => {
      if (doc.exists) {
        alert('此專輯已存在!')
      }
      else {
        storageRef.put(upload).then(() => {
          storageRef.getDownloadURL().then(function (photo__url) {
            photoUrl = photo__url
            db.collection('albums').doc(name).set({
              name,
              category,
              desc,
              photoUrl,
              songs: []
            }).then(() => {
              alert('新增成功!')
            })
          })
        })  
      }
    })
  }
  addSong() {
    let select = this.state.select__playlist
    let album = this.state.song__album
    let name = this.state.song__name
    let singer = this.state.song__singer
    let length = this.state.song__length
    let upload = this.state.song__file[0]
    let storageRef = firebase.storage().ref('mp3/' + name)
    let songUrl = ''
    storageRef.put(upload).then(() => {
      storageRef.getDownloadURL().then(function (song__url) {
        songUrl = song__url
        db.collection('albums').doc(select).get().then((doc) => {
          if (doc.exists) {
            let { songs } = doc.data()
            let newSong = {
              name,
              singer,
              length,
              songUrl,
              album,
            }
            console.log(newSong)
            songs.push(newSong)
            db.collection('albums').doc(select).update({
              songs,
            }).then(() => {
              alert('添加成功!')
            })
          }
        })
      })
    })
  }
}

export default Admin
