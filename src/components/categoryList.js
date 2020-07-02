import React from 'react';
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import CategoryCard from './categoryCard'

class CategoryList extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className='list'>
        <div className='title'>曲風與情調</div>
        <div className='items'>
          <CategoryCard />
          <CategoryCard />
        </div>
      </div>
    )
  }
}

export default CategoryList
