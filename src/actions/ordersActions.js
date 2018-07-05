import { CALL_API, Schemas  } from '../middleware/api'
import config from '../config'

export const FETCH_ORDERS = 'FETCH_ORDERS';
export const FETCH_ORDERS_SUCCESS = 'FETCH_ORDERS_SUCCESS';
export const FETCH_ORDERS_FAILURE = 'FETCH_ORDERS_FAILURE';

/*export const FETCH_ORDERS2 = 'FETCH_ORDERS2';
export const FETCH_ORDERS2_SUCCESS = 'FETCH_ORDERS2_SUCCESS';
export const FETCH_ORDERS2_FAILURE = 'FETCH_ORDERS2_FAILURE';

export const FETCH_ORDERS3 = 'FETCH_ORDERS3';
export const FETCH_ORDERS3_SUCCESS = 'FETCH_ORDERS3_SUCCESS';
export const FETCH_ORDERS3_FAILURE = 'FETCH_ORDERS3_FAILURE';

export const FETCH_ORDER_DETAILS = 'FETCH_ORDER_DETAILS';
export const FETCH_ORDER_DETAILS_SUCCESS = 'FETCH_ORDER_DETAILS_SUCCESS';
export const FETCH_ORDER_DETAILS_FAILURE = 'FETCH_ORDER_DETAILS_FAILURE';*/

export const FETCH_ORDER_PAYMENTS = 'FETCH_ORDER_PAYMENTS';
export const FETCH_ORDER_PAYMENTS_SUCCESS = 'FETCH_ORDER_PAYMENTS_SUCCESS';
export const FETCH_ORDER_PAYMENTS_FAILURE = 'FETCH_ORDER_PAYMENTS_FAILURE';

export const FIND_ORDER = 'FIND_ORDER';
export const FIND_ORDER_SUCCESS = 'FIND_ORDER_SUCCESS';
export const FIND_ORDER_FAILURE = 'FIND_ORDER_FAILURE';

export const FETCH_POINTS = 'FETCH_POINTS';
export const FETCH_POINTS_SUCCESS = 'FETCH_POINTS_SUCCESS';
export const FETCH_POINTS_FAILURE = 'FETCH_POINTS_FAILURE';

const url = config[process.env.NODE_ENV].api;

const fetchOrders = (page,category,id) => ({
  [CALL_API]: {
    types: [FETCH_ORDERS, FETCH_ORDERS_SUCCESS, FETCH_ORDERS_FAILURE],
    endpoint: id !== '' ? url + '/orders/' + page + '?' + category + '=' + id : url + '/orders/' + page,
    method: 'GET',
    headers: {
      'Authorization' : `Bearer ${sessionStorage.jwt}`,
      ///'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
})

const findOrderAction = (page, invoice) => ({
  [CALL_API]: {
    types: [FIND_ORDER, FIND_ORDER_SUCCESS, FIND_ORDER_FAILURE],
    // endpoint: invoice !== '' ? url + '/orders/' + page + '?invoice=' + invoice : url + '/orders/' + page,
    endpoint: url + '/orders/' + page + '?invoice=' + invoice,
    method: 'GET',
    headers: {
      'Authorization' : `Bearer ${sessionStorage.jwt}`,
      ///'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
})

/*const fetchOrders2 = (page) => ({
  [CALL_API]: {
    types: [FETCH_ORDERS2, FETCH_ORDERS2_SUCCESS, FETCH_ORDERS2_FAILURE],
    endpoint: url + '/orders2/' + page,
    method: 'GET',
    headers: {
      'Authorization' : `Bearer ${sessionStorage.jwt}`,
      ///'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
})*/

/*const fetchOrders3 = (page, orderid = '') => ({
  [CALL_API]: {
    types: [FETCH_ORDERS3, FETCH_ORDERS3_SUCCESS, FETCH_ORDERS3_FAILURE],
    //endpoint: url + '/orders3/' + page,
    //endpoint: url + '/orders3/' + page + '?orderid='+orderid,
    endpoint: orderid !== '' ? url + '/orders3/' + page + '?orderid=' + orderid : url + '/orders3/' + page,
    method: 'GET',
    headers: {
      'Authorization' : `Bearer ${sessionStorage.jwt}`,
      ///'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
})*/

/*const fetchOrders3 = (page) => ({
  [CALL_API]: {
    types: [FETCH_ORDERS3, FETCH_ORDERS3_SUCCESS, FETCH_ORDERS3_FAILURE],
    //endpoint: url + '/orders3/' + page,
    endpoint: url + '/orders3/' + page,
    method: 'GET',
    headers: {
      'Authorization' : `Bearer ${sessionStorage.jwt}`,
      ///'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
})*/

/*const fetchOrderDetails = (page, orderid) => ({
  [CALL_API]: {
    types: [FETCH_ORDER_DETAILS, FETCH_ORDER_DETAILS_SUCCESS, FETCH_ORDER_DETAILS_FAILURE],
    endpoint: url + '/order/' + page + '?orderid=' + orderid,
    method: 'GET',
    headers: {
      'Authorization' : `Bearer ${sessionStorage.jwt}`,
      ///'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
})*/

const fetchOrderPayments = (page, orderid) => ({
  [CALL_API]: {
    types: [FETCH_ORDER_PAYMENTS, FETCH_ORDER_PAYMENTS_SUCCESS, FETCH_ORDER_PAYMENTS_FAILURE],
    // endpoint: url + '/payments/' + page + '?orderid=' + orderid,
    endpoint: url + '/payments?orderid=' + orderid,
    method: 'GET',
    headers: {
      'Authorization' : `Bearer ${sessionStorage.jwt}`,
      ///'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
})

const fetchPoints = (page) => ({
  [CALL_API]: {
    types: [FETCH_POINTS, FETCH_POINTS_SUCCESS, FETCH_POINTS_FAILURE],
    endpoint: url + '/points/' + page,
    method: 'GET',
    headers: {
      'Authorization' : `Bearer ${sessionStorage.jwt}`,
      ///'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
})

export const loadAllOrders = (page, category = '', orderid = '') => (dispatch) => {
  return dispatch(fetchOrders(page, category, orderid))
}

export const findOrder = (page, invoice = '') => (dispatch) => {
  return dispatch(findOrderAction(page, invoice))
}

/*export const loadAllOrders2 = (page) => (dispatch) => {
  return dispatch(fetchOrders2(page))
}

export const loadAllOrders3 = (page, orderid) => (dispatch) => {
  return dispatch(fetchOrders3(page, orderid))
}*/

// export const loadOrder = (page, orderid) => (dispatch) => {
//   return dispatch(fetchOrderDetails(page, orderid))
// }

export const loadOrderPayments = (page, orderid) => (dispatch) => {
  return dispatch(fetchOrderPayments(page, orderid))
}

export const loadLoyaltyPoints = (page=1) => (dispatch) => {
  return dispatch(fetchPoints(page))
}
