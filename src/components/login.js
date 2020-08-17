import React from 'react';
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { db, firebase } from '../static/js/firebase'
import { changeLoginStatus, checkIsAdmin, getUser } from '../actions/auth'
import { connect } from 'react-redux';

class SignIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email:'test@gmail.com',
      password:'123456'
    }
  }
  componentDidMount() {
    let { changeLoginStatus, checkIsAdmin, getUser } = this.props
    let hasUser = JSON.parse(localStorage.getItem('user'))
    if (hasUser) {
      changeLoginStatus()
      checkIsAdmin()
      getUser()
    }
  }
  render() {
    let { isLogin } = this.props
    let { email, password } = this.state
    if (!isLogin) {
      return (
        <div className='signin'>
          <div className='wrapper'>
            <div className='header'>WOWMUSIC</div>
            <div className='fb-login'></div>
            <div className='cuttingline'></div>
            <div className='inform'>
              <div><input data-field='email' placeholder='使用wowmusic帳號登入' onChange={this.handleInput.bind(this)} value={email}/></div>
              <div><input data-field='password' placeholder='密碼' type='password' onChange={this.handleInput.bind(this)} value={password}/></div>
              <div onClick={this.onSubmit.bind(this)}>登入</div>
            </div>
            <div className='footer'><Link to='/signup'>還沒有 wowmusic 帳號 ?</Link></div>
          </div>
        </div>
      )
    }
    else {
      return (
        <Redirect push to='/homepage'></Redirect>
      )
    }
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
    let { email, password } = this.state
    let { changeLoginStatus, checkIsAdmin, getUser } = this.props
    
    firebase.auth().signInWithEmailAndPassword(email, password).then(
      () => {
        firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
            db.collection('users').where('email', '==', email).get().then((querySnapshot) => {
              querySnapshot.forEach((doc) => {
                let { isAdmin, email, username } = doc.data()
                if (isAdmin) {
                  let User = {
                    email,
                    username,
                    uid: user.uid,
                  }
                  localStorage.setItem('user', JSON.stringify(User))
                  getUser()
                  checkIsAdmin()
                  changeLoginStatus()
                  
                }
                else {
                  let User = {
                    email,
                    username,
                    uid: user.uid
                  }
                  localStorage.setItem('user', JSON.stringify(User))
                  changeLoginStatus()
                  getUser()
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
    let { isLogin } = this.props
    if (!isLogin) {
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
                <input data-field='password' placeholder='密碼' type='password' onChange={this.handleInput.bind(this)}></input>
              </div>
              <div>
                <input data-field='checkpassword' placeholder='確定密碼' type='password'></input>
              </div>
              <div onClick={this.onSubmit.bind(this)}>註冊</div>
            </div>
            <div className='footer'>
              當您按下「建立帳號」按鈕，代表您已經閱讀並同意 wowmusic 服務條款 及 訂閱電子報</div>
          </div>
        </div>
      )
    }
    else {
      return (
        <Redirect push to='/homepage'></Redirect>
      )
    }
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
    let { email, password, name, username, isAdmin } = this.state
    let { changeLoginStatus, getUser, data } = this.props
    let { songs, photoUrl } = data[0]
    let album = data[0].name
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
          return db.collection('users').doc(user.uid).collection('playlist').doc('queue').set({
            songs,
            name: album,
            playIndex: 0,
            photoUrl,
          })
        }).then(() => {
          let User = {
            email,
            username,
            uid: user.uid,
          }
          localStorage.setItem('user', JSON.stringify(User))
          getUser()
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
const mapDispatchToProps = dispatch => {
  return {
    changeLoginStatus: () => dispatch(changeLoginStatus()),
    checkIsAdmin: () => dispatch(checkIsAdmin()),
    getUser: () => dispatch(getUser())
  }
}
const mapStateToProps = state => {
  return {
    isLogin: state.auth.isLogin,
    isAdmin: state.auth.isAdmin
  }
}
const ConnectedSignIn = connect(mapStateToProps,mapDispatchToProps)(SignIn)
const ConnectedSignUp = connect(mapStateToProps,mapDispatchToProps)(SignUp)
export { ConnectedSignUp, ConnectedSignIn }
