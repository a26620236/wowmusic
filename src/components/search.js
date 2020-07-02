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

class Search extends React.Component {
  render() {
    return (
      <div className='search'>
        <HeaderSearch/>
        <div className='search-body'>
          <CategoryList/>
          <CategoryList />
          <CategoryList />
        </div>
      </div>
    )
  }
}
export default Search
