import {
  USER__ISLOGIN,
  USER__ISADMIN,
  USER__INFORM
} from '../actions/auth'

const initialState = {
  isLogin: false,
  isAdmin: false,
  user: null
}

export function auth(state=initialState, action) {
  switch (action.type) {
    case USER__ISLOGIN:
      return ({
        ...state,
        isLogin: action.payLoad
      })
    case USER__ISADMIN:
      return ({
        ...state,
        isAdmin: action.payLoad
      })
    case USER__INFORM:
      return ({
        ...state,
        user: action.payLoad
      })
    default:
      return state
  }
}

