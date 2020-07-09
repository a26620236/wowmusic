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
      <div className='itembox'>
        <Link to={'/album/' + this.props.data.name}>
          <img src={this.props.data.photoUrl} />
        </Link>
        <div className='headline'>{this.props.data.name}</div>
        <div className='inform'>{this.props.data.desc}</div>
      </div>
    )
  }
}

export default AlbumCard
