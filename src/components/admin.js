import React from 'react';
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { db, firebase } from '../static/js/firebase'

class Admin extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      album__name:'',
      album__category:'',
      album__desc:'',
      album__photo:'',
      select__album:'',
      song__name:'',
      song__singer:'',
      song__length:'',
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
                  專輯名稱:
                  <input data-field='album__name' onChange={this.handleInput.bind(this)}></input>
                </div>
                <div className='inputbox'>
                  分類:
                  <input data-field='album__category' onChange={this.handleInput.bind(this)}></input>
                </div>
                <div className='inputbox'>
                  介紹:
                  <input data-field='album__desc' onChange={this.handleInput.bind(this)}></input>
                </div>
                <div className='inputbox'>
                  封面相片:
                  <input data-field='album__photo' onChange={this.handleInput.bind(this)}></input>
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
              專輯名稱:
              <input data-field='select__album' onChange={this.handleInput.bind(this)}></input>
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
              歌曲長度:
              <input data-field='song__length' onChange={this.handleInput.bind(this)}></input>
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
  addAlbum() {
    let name = this.state.album__name
    let category = this.state.album__category
    let desc = this.state.album__desc
    let photo = this.state.album__photo
    console.log(name)
    db.collection('albums').doc(name).get().then((doc) => {
      if (doc.exists) {
        alert('此專輯已存在!')
      }
      else {
        db.collection('albums').doc(name).set({
          name,
          category,
          desc,
          photo,
          songs: []
        }).then(() => {
          alert('新增成功!')
        })
      }
    })
  }
  addSong() {
    let select = this.state.select__album
    let name = this.state.song__name
    let singer = this.state.song__singer
    let length = this.state.song__length
    db.collection('albums').doc(select).get().then((doc) => {
      if (doc.exists) {
        let { songs } = doc.data()
        let newSong = {
          name,
          singer,
          length,
        }
        songs.push(newSong)
        db.collection('albums').doc(select).update({
          songs,
        }).then(() => {
          alert('添加成功!')
        })
      }
    })
  }
}

export default Admin
