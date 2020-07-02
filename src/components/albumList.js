import React from 'react';
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import AlbumCard from './albumCard'

class Albumlist extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className='list'>
        <div className='title'>排行榜</div>
        <div className='items'>
          <AlbumCard />
        </div>
      </div>
    )
  }
}

export default Albumlist
