import React from 'react';
import { SignUp, SignIn } from './components/login'
import { Homepage } from './components/homepage'
import { Search } from './components/search'
import { Playlist } from './components/playlist'

class App extends React.Component {
  render() {
    return (
      <main>
        <Homepage/>
      </main>
    )
  }
}
export { App }
