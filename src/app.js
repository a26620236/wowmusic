import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { db, firebase } from './static/js/firebase'
import { Homepage } from './components/homepage'
import { SignUp, SignIn } from './components/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogin: false,
      isAdmin: false,
      user: null,
      hots: []
    }
  }
  componentDidMount() {
    let { user } = this.state
    let getUser = JSON.parse(localStorage.getItem('user'))
    if (user == null && getUser) {
      this.setState((currentState) => {
        let newState = {
          ...currentState,
          user: getUser,
          isLogin: true,
          isAdmin: true,
        }
        return newState
      })
    }
  }
  render() {
    let { isLogin, isAdmin, user } = this.state
    return (
      <main>
        <Router>
          <Switch>
            <Route path='/signup'>
              <SignUp changeLoginStatus={this.changeLoginStatus.bind(this)} isLogin={isLogin}/>
            </Route>
            <Route path='/signin'>
              <SignIn changeLoginStatus={this.changeLoginStatus.bind(this)} checkIsAdmin={this.checkIsAdmin.bind(this)} isLogin={isLogin}/>
            </Route>
            <Route path='/'>
              <Homepage isLogin={isLogin} isAdmin={isAdmin} user={user}/>
            </Route>
          </Switch>
        </Router>
      </main>
    )
  }
  changeLoginStatus() {
    let user = JSON.parse(localStorage.getItem('user'))
    this.setState((currentState) => {
      let newState = {
        ...currentState,
        isLogin: true,
        user,
      }
      return newState
    })
  }
  checkIsAdmin() {
    this.setState((currentState) => {
      let newState = {
        ...currentState,
        isAdmin: true
      }
      return newState
    })
  }
}
export { App }
