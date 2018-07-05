import { CALL_API, Schemas  } from '../middleware/api'
import config from '../config'


import Auth from '../auth/authenticator'

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_CHECK = 'LOGIN_CHECK';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOG_OUT = 'LOG_OUT';

const api_url = config[process.env.NODE_ENV].api;
const base_url = config[process.env.NODE_ENV].base;

const login = (credentials) => ({

  [CALL_API]: {
    types: [LOGIN_CHECK, LOGIN_SUCCESS, LOGIN_FAILURE],
    endpoint: base_url + '/' + 'login',
    method: 'POST',
    body: Object.keys(credentials).map(key=>encodeURIComponent(key)+'='+encodeURIComponent(credentials[key])) .join('&'),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
  }
})

export const authenticate = (credentials) => (dispatch) => {
  return dispatch(login(credentials))
}

export const signout = () => {
   Auth.logOut();
   return {type: LOG_OUT}
}
