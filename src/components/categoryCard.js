import React from 'react';
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class CategoryCard extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    let { data } = this.props
    let { category, categoryUrl } = data
    return (
      <Link to={'/category/' + category}>
        <div className='itembox'>
          <img src={categoryUrl}></img>
          <div className='category'>{category}</div>
        </div>
      </Link>
    )
  }
}

export default CategoryCard
