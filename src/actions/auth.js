export const USER__ISLOGIN = 'USER__ISLOGIN'
export const USER__ISADMIN = 'USER__ISADMIN'
export const USER__INFORM = 'USER__INFORM'

export function changeLoginStatus() {
  return {
    type: USER__ISLOGIN,
    payLoad: true
  }
}
export function checkIsAdmin() {
  return {
    type: USER__ISADMIN,
    payLoad: true
  }
}
export function getUser() {
  let getUser = JSON.parse(localStorage.getItem('user'))
  return {
    type: USER__INFORM,
    payLoad: getUser
  }
}
