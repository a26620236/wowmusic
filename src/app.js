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
      isLogin: false,
      isAdmin: false,
    }
  }
  render() {
    if (this.state.isLogin == false){
      return (
        <main>
          <Router>
            <Switch>
              <Route path='/signup'>
                <SignUp changeLoginStatus={this.changeLoginStatus.bind(this)} />
              </Route>
              <Route path='/'>
                <SignIn changeLoginStatus={this.changeLoginStatus.bind(this)} checkIsAdmin={this.checkIsAdmin.bind(this)}/>
              </Route>
            </Switch>
          </Router>
        </main>
      )
    }else {
      return (
        <main>
          <Homepage isLogin={this.state.isLogin} isAdmin={this.state.isAdmin}/>
        </main>
      )
    }
  }
  changeLoginStatus() {
    this.setState((currentState) => ({
      ...currentState,
      isLogin: true
    }))
  }
  checkIsAdmin() {
    this.setState((currentState) => ({
      ...currentState,
      isAdmin: true
    }))
  }
}
export { App }
