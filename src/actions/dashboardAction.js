import { CALL_API, Schemas  } from '../middleware/api'
import config from '../config'

export const FETCH_DASHBOARD = 'FETCH_DASHBOARD';
export const FETCH_DASHBOARD_SUCCESS = 'FETCH_DASHBOARD_SUCCESS';
export const FETCH_DASHBOARD_FAILURE = 'FETCH_DASHBOARD_FAILURE';

const url = config[process.env.NODE_ENV].api;

const fetchDashboard = () => ({
  [CALL_API]: {
    types: [FETCH_DASHBOARD, FETCH_DASHBOARD_SUCCESS, FETCH_DASHBOARD_FAILURE],
    endpoint: url + '/dashboard',
    method: 'GET',
    headers: {
      'Authorization' : `Bearer ${sessionStorage.jwt}`,
      ///'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
})

export const loadDashboard = () => (dispatch) => {
  return dispatch(fetchDashboard())
}
