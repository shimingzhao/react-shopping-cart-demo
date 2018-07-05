import config from '../config'
import { normalize, schema } from 'normalizr'
import { camelizeKeys } from 'humps'
import 'whatwg-fetch'
import "isomorphic-fetch"
import ES6Promise from 'es6-promise'
import {browserHistory} from 'react-router'

require('es6-object-assign').polyfill()
ES6Promise.polyfill()

//const API_ROOT = config[process.env.NODE_ENV].api
const BASE_ROOT = config[process.env.NODE_ENV].base

// Fetches an API response and normalizes the result JSON according to schema.
// This makes every API response have the same shape, regardless of how nested it was.
const callApi = (endpoint, method, body, headers, schema) => {

//const fullAPIUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint : endpoint
const fullBASEUrl = (endpoint.indexOf(BASE_ROOT) === -1) ? BASE_ROOT + endpoint : endpoint

let token = sessionStorage.jwt

let config = {}

config = {
  headers: headers,
  method: method,
  body: body,
  //mode: 'cors'
}

  return fetch(fullBASEUrl, config)
    .then(response =>
      response.json().then(json => {

        if (!response.ok) {
          return Promise.reject(json)
        }

        return Object.assign({},
          { payload: json },
          //{ payload: normalize(camelizedJson, schema)},
          { response }
        )
      })
    )
    .catch(e => {

      console.log(e)

      if (e.status === 401) {
        //browserHistory.push('/login')
        browserHistory.push('/logout')
        throw e;
      }
      if(e.status === 301) {
        console.log('WWWWEEEE WOOOO WEEEE WOOOO 301!!!')
      }
      throw e;
    })
}

// Action key that carries API call info interpreted by this Redux middleware.
export const CALL_API = 'CALL_API'
//export const CALL_API = Symbol('CALL_API')

// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  //console.log('CALL_API')
  const callAPI = action[CALL_API]
  //console.log(action)
  //console.log('CALL_API end')
  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint, method, body, headers } = callAPI
  const { schema, types } = callAPI

  // console.log('headers')
  // console.log(headers)

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState())
  }

  // console.log('method IS: ' + method)
  // console.log('body IS: ' + body)
  // console.log('body IS: ' + headers)

  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.')
  }
  // if (!schema) {
  //   throw new Error('Specify one of the exported Schemas.')
  // }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.')
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.')
  }

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data)
    delete finalAction[CALL_API]
    return finalAction
  }

  const [ requestType, successType, failureType ] = types
  next(actionWith({ type: requestType }))

  return callApi(endpoint, method, body, headers, schema).then(
    response => next(actionWith({
      response,
      type: successType
    })),
    error => next(actionWith({
      type: failureType,
      error: error
      //error: error.message || 'Something bad happened'
      //error: error
      //error: (error.message !== undefined ) ? error.message : (error.message.messages !== undefined) ? error.message.messages : 'Something REALLY bad happened'

    }))
  )
}
