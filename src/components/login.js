import React from 'react';
import ReactDOM from 'react-dom'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class SignIn extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className='signin'>
        <div className='wrapper'>
          <div className='header'>WOWMUSIC</div>
          <div className='fb-login'></div>
          <div className='cuttingline'></div>
          <div className='inform'>
            <div><input placeholder='使用wowmusic帳號登入'/></div>
            <div><input placeholder='密碼'/></div>
            <div>登入</div>
          </div>
          <div className='footer'><a href='#'>還沒有 wowmusic 帳號 ?</a></div>
        </div>
      </div>
    )
  }
}
class SignUp extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div className='signup'>
        <div className='wrapper'>
          <div className='head'>註冊 WOWMUSIC</div>
          <div className='inform'>
            <div><input placeholder='example@mail.com'></input></div>
            <div><input placeholder='真實姓名'></input></div>
            <div><input placeholder='暱稱'></input></div>
            <div><input placeholder='密碼'></input></div>
            <div><input placeholder='確定密碼'></input></div>
            <div className=''>註冊</div>
          </div>
          <div className='footer'>
            當您按下「建立帳號」按鈕，代表您已經閱讀並同意 wowmusic服務條款 及 訂閱電子報</div>
        </div>
      </div>
    )
  }
}

export {SignUp, SignIn}
