import React from 'react';
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './headerNormal'
import AlbumCard from './albumCard'
import { db, firebase, storage } from '../static/js/firebase'

class Category extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
    }
  }
  componentDidMount() {
    let data = []
    let { category } = this.props
    db.collection("albums").where('category', '==', category).get().then((querySnapshot) => {
      querySnapshot.forEach(function (doc) {
        data.push(doc.data())
      });
      this.setState((currentState) => {
        let newState = {
          ...currentState,
          data,
        }
        return newState
      })
    })
  }
  render() {
    let { data } = this.state
    let { isLogin, isAdmin, user , category } = this.props
    if (data.length > 0) {
      return (
        <div className='category'>
          <Header isLogin={isLogin} isAdmin={isAdmin} user={user}/>
          <div className='category-wrapper'>
            <div className='banner'>
              {category}
            </div>
            <div className='wrapper__background'>
              <div className='title'>熱門播放清單</div>
              <div className='items'>
                {data.map((e, index) => {
                  return <AlbumCard data={e} key={index} />
                })}
              </div>
            </div>
          </div>
        </div>
      )
    }
    else {
      return (
        <div className='isloading'>
          <Header isLogin={isLogin} isAdmin={isAdmin} user={user} />
        </div>
      )
    }
  }
}

export default Category
