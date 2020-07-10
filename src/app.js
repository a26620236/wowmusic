import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Homepage } from './components/homepage'
import { SignUp, SignIn } from './components/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLogin: true,
      isAdmin: true,
    }
  }
  render() {
    let { isLogin, isAdmin } = this.state
    return (
      <main>
        <Router>
          <Switch>
            <Route path='/'>
              <Homepage isLogin={isLogin} isAdmin={isAdmin} />
            </Route>
            <Route path='/signup'>
              <SignUp changeLoginStatus={this.changeLoginStatus.bind(this)} isLogin={isLogin}/>
            </Route>
            <Route path='/'>
              <SignIn changeLoginStatus={this.changeLoginStatus.bind(this)} checkIsAdmin={this.checkIsAdmin.bind(this)} isLogin={isLogin}/>
            </Route>
          </Switch>
        </Router>
      </main>
    )
  }
  changeLoginStatus() {
    this.setState((currentState) => {
      let newState = {
        ...currentState,
        isLogin: true
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
