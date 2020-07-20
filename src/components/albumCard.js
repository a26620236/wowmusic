import React from 'react';
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { db, firebase } from '../static/js/firebase'

class AlbumCard extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Link className='itembox' to={'/album/' + this.props.data.name}>
        <div className='album-img'>
          <img src={this.props.data.photoUrl} />
        </div>
        <div className='headline'>{this.props.data.name}</div>
        <div className='inform'>{this.props.data.desc}</div>
      </Link>
    )
  }
}

export default AlbumCard
