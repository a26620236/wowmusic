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
    if (data.length > 0) {
      return (
        <div>
          {data.map((e, index) => {
            return <div className='list' key={index}>
              <div className='title'>{e.category}</div>
              <div className='items'>
                <AlbumCard data={e} />
              </div>
            </div>
          })}
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
