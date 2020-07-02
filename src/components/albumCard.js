import React from 'react';
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class AlbumCard extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className='itembox'>
        <Link to='/album/1'>
          <img src='https://i.scdn.co/image/ab67706f00000002e8011b2b5c418de7bbea3e47' />
        </Link>
        <div className='headline'>煙幕</div>
        <div className='inform'>陳忻玥</div>
      </div>
    )
  }
}

export default AlbumCard
