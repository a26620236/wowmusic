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
    let { isLogin, isAdmin } = this.props
    if (data.length > 0) {
      return (
        <div className='category'>
          <Header isLogin={isLogin} isAdmin={isAdmin} />
          <div className='wrapper'>
            <div className='header'>古典樂</div>
            <div className='wrapper__background'>
              {data.map((e, index) => {
                return <AlbumCard data={e} key={index} />
              })}
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

export default Category
