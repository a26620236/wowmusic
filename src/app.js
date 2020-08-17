import React from 'react';
import { Provider } from 'react-redux'
import store from './store'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { db, firebase } from './static/js/firebase'
import Homepage from './components/homepage'
import { ConnectedSignUp, ConnectedSignIn } from './components/login'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hots: []
    }
  }
  componentDidMount() {
    let hots = []
    db.collection("albums").where('category', '==', '熱門好歌').get().then(function (querySnapshot) {
      querySnapshot.forEach(function (doc) {
        hots.push(doc.data())
      });
    }).then(() => {
      this.setState((currentState) => {
        let newState = {
          ...currentState,
          hots,
        }
        return newState
      })
    })
  }
  render() {
    let { user, hots } = this.state
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path='/signup'>
              <ConnectedSignUp data={hots}/>
            </Route>
            <Route path='/signin'>
              <ConnectedSignIn />
            </Route>
            <Route path='/'>
              <Homepage/>
            </Route>
          </Switch>
        </Router>
      </Provider>
    )
  }
}
export default App
