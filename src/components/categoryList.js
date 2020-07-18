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
    let { category } = this.props
    let innerArr = []
    for (let i=0; i<category.length; i++) {
      let arr = <CategoryCard data={category[i]} key={i}/>
      innerArr.push(arr)
    }
    return (
      <div className='list'>
        <div className='title'>曲風與情調</div>
        <div className='items'>
          {innerArr}
        </div>
      </div>
    )
  }
}

export default CategoryList
