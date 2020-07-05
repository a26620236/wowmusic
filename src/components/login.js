import React from 'react';
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { db, firebase } from '../static/js/firebase'

class SignIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email:'',
      password:''
    }
  }
  render() {
    return (
      <div className='signin'>
        <div className='wrapper'>
          <div className='header'>WOWMUSIC</div>
          <div className='fb-login'></div>
          <div className='cuttingline'></div>
          <div className='inform'>
            <div><input data-field='email' placeholder='使用wowmusic帳號登入' onChange={this.handleInput.bind(this)}/></div>
            <div><input data-field='password' placeholder='密碼' onChange={this.handleInput.bind(this)}/></div>
            <div onClick={this.onSubmit.bind(this)}>登入</div>
          </div>
          <div className='footer'><Link to='/signup'>還沒有 wowmusic 帳號 ?</Link></div>
        </div>
      </div>
    )
  }
  handleInput(e) {
    let field = e.target.getAttribute('data-field')
    let value = e.target.value
    this.setState((currentState) => {
      let newState = {
        ...currentState,
        [field]: value
      }
      return newState;
    })
  } 
  onSubmit() {
    let email = this.state.email
    let password = this.state.password
    let changeLoginStatus = this.props.changeLoginStatus
    let checkIsAdmin = this.props.checkIsAdmin
    firebase.auth().signInWithEmailAndPassword(email, password).then(
      () => {
        firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
            db.collection('users').where('email', '==', email).get().then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                let isAdmin = doc.data().isAdmin
                if (isAdmin) {
                  checkIsAdmin()
                  changeLoginStatus()
                }
              })
            })
            // changeLoginStatus()
            // User is signed in.
          } else {
            // No user is signed in.
          }
        });
      }
    ).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage)
    });
  }
}
class SignUp extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email:'',
      name:'',
      password:'',
      username:'',
      isAdmin:false,
    }
  }
  render() {
    return (
      <div className='signup'>
        <div className='wrapper'>
          <div className='head'>註冊 WOWMUSIC</div>
          <div className='inform'>
            <div>
              <input data-field='email' placeholder='example@mail.com' onChange={this.handleInput.bind(this)}></input>
            </div>
            <div>
              <input data-field='name' placeholder='真實姓名' onChange={this.handleInput.bind(this)}></input>
            </div>
            <div>
              <input data-field='username' placeholder='暱稱' onChange={this.handleInput.bind(this)}></input>
            </div>
            <div>
              <input data-field='password' placeholder='密碼' onChange={this.handleInput.bind(this)}></input>
            </div>
            <div>
              <input data-field='checkpassword' placeholder='確定密碼'></input>
            </div>
            <div onClick={this.onSubmit.bind(this)}>註冊</div>
          </div>
          <div className='footer'>
            當您按下「建立帳號」按鈕，代表您已經閱讀並同意 wowmusic服務條款 及 訂閱電子報</div>
        </div>
      </div>
    )
  }
  handleInput(e) {
    let field = e.target.getAttribute('data-field')
    let value = e.target.value
    this.setState((currentState) => {
      let newState = {
        ...currentState,
        [field]: value
      }
      return newState;
    })
  }
  onSubmit() {
    let email = this.state.email
    let password = this.state.password
    let name = this.state.name
    let username = this.state.username
    let isAdmin = this.state.isAdmin
    let changeLoginStatus = this.props.changeLoginStatus
    
    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
      let user = firebase.auth().currentUser;

      user.updateProfile({
        displayName: name,
      }).then(function () {
        db.collection("users").doc(user.uid).set({
          name,
          username,
          email,
          password,
          isAdmin
        })
        .then(function () {
          console.log("Document successfully written!");
          changeLoginStatus()
        })
        .catch(function (error) {
          console.error("Error writing document: ", error);
        });
      }).catch(function (error) {
        // An error happened.
      });
    }).catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode, errorMessage)
    });
  }
}

export {SignUp, SignIn}
