import React from 'react';
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import HeaderSearch from './header-search'
import CategoryList from './categoryList'
import MusicPlayer from './musicplayer'
import { db, firebase } from '../static/js/firebase'

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      category: []
    }
  }
  componentDidMount() {
    let category = []
    db.collection("category").get().then( (querySnapshot) => {
      querySnapshot.forEach(function (doc) {
        category.push(doc.data())
      });
    }).then(() => {
      this.setState((currentState) => {
        let newState = {
          ...currentState,
          category,
        }
        return newState
      })
    })
  }
  render() {
    let { category } = this.state
    return (
      <div className='search'>
        <HeaderSearch/>
        <div className='search-body'>
          <CategoryList category={category}/>
        </div>
      </div>
    )
  }
}
export default Search
