import {

  LOGIN_SUCCESS,
  LOGIN_CHECK,
  LOGIN_FAILURE,
  LOG_OUT,

  DESTROY_STATE_DATA

} from '../actions/sessionActions';

import {browserHistory} from 'react-router'


const initialState = {

  data: {
    session: !!sessionStorage.jwt,
    isFetching: false,
    error: {}
  }

};



export default function sessionReducer(state = initialState, action) {

  switch(action.type) {

    case 'TOKEN_EXPIRED':
      return { ...state,
                data: {
                 session: false,
                 isFetching: false,
                  error: {
                    code: '401',
                    message: 'Authentication failure, Token has expired'
                  }
                }
              };

    case LOGIN_CHECK:
      return { ...state,
                data: {
                 session: false,
                 isFetching: true,
                 error: {}
                }
               };

    case LOGIN_SUCCESS:
      sessionStorage.setItem('jwt', action.response.payload.access_token);
      console.log(action.response.payload.access_token)
      return { ...state,
                data: {
                 session: !!sessionStorage.jwt,
                 isFetching: false,
                 error: {}
                }
              };

    case LOGIN_FAILURE:
      return { ...state,
                data: {
                 session: false,
                 isFetching: false,
                  error: {
                    code: action.error.code,
                    message: action.error.message
                  }
                }
              };


    case LOG_OUT:
    return { ...state,
              data: {
               session: !!sessionStorage.jwt,
               isFetching: false,
                error: {}
              }
            };

    case '@@redux-form/RESET':
    return { ...state,
              data: {
               session: state.data.session,
               isFetching: state.data.isFetching,
                error: {}
              }
            };


    case 'DESTROY_STATE_DATA':
      state = initialState
      return state;

    default:{
      return state;
    }
  }
}
