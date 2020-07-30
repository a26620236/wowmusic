import React from 'react';
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AlbumCard from './albumCard'
import { db, firebase } from '../static/js/firebase'

class Albumlist extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    let { data } = this.props
    let outer = []
    let inner = []
    let arr = []
    let arr1 =[]
    if (data.length > 0) {
      for (let i=0; i<data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
          arr1 = <div className='items' key={j}>
            <AlbumCard data={data[i][j]} />
          </div>
          inner.push(arr1)
        }
        arr = <div className='list' key={i}>
          <div className='title'>{data[i][0].category}</div>
          <div className='itemlist'>{inner}</div>
        </div>
        outer.push(arr)
        inner = []
      }
      return (
        <div>
          {outer}
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

export default Albumlist
