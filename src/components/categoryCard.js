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
    return (
      <div className='itembox'>
        <div className='category'>居家生活</div>
      </div>
    )
  }
}

export default CategoryCard
