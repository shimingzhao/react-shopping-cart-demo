import {
  FETCH_ORDERS,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILURE,

  FETCH_ORDERS2,
  FETCH_ORDERS2_SUCCESS,
  FETCH_ORDERS2_FAILURE,

  FETCH_ORDERS3,
  FETCH_ORDERS3_SUCCESS,
  FETCH_ORDERS3_FAILURE,

  FETCH_ORDER_DETAILS,
  FETCH_ORDER_DETAILS_SUCCESS,
  FETCH_ORDER_DETAILS_FAILURE,

  FETCH_ORDER_PAYMENTS,
  FETCH_ORDER_PAYMENTS_SUCCESS,
  FETCH_ORDER_PAYMENTS_FAILURE,

  FIND_ORDER,
  FIND_ORDER_SUCCESS,
  FIND_ORDER_FAILURE,

  FETCH_POINTS,
  FETCH_POINTS_SUCCESS,
  FETCH_POINTS_FAILURE

} from '../actions/ordersActions';

//import initialState from './initialState'
import {browserHistory} from 'react-router'

import _ from 'lodash'

const initialState = {
  orders: {
    data: [],
    isFetching: false
  },

  orders2: {
    data: [],
    isFetching: false
  },

  orders3: {
    data: [],
    isFetching: false
  },

  order_details: {
    data: [],
    isFetching: false,
    error: {}
  },

  order_payments: {
    data: [],
    isFetching: false,
    error: {}
  },

  find_order: {
    data: [],
    isFetching: false
  },

  loyalty_points:{
    data: [],
    isFetching: false
  }

};

const isEmpty = (obj) => {
  for (let key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}

_.mixin({
  /*
    * @mixin
    *
    * Splits a collection into sets, grouped by the result of running each value
    * through iteratee. If iteratee is a string instead of a function, groups by
    * the property named by iteratee on each of the values.
    *
    * @param {array|object} list - The collection to iterate over.
    * @param {(string|function)[]} values - The iteratees to transform keys.
    * @param {object=} context - The values are bound to the context object.
    *
    * @returns {Object} - Returns the composed aggregate object.
    */
  groupByMulti: function (list, values, context) {
    if (!values.length) {
      return list;
    }
    let byFirst = _.groupBy(list, values[0], context),
      rest = values.slice(1);
    for (let prop in byFirst) {
      byFirst[prop] = _.groupByMulti(byFirst[prop], rest, context);
    }
    return byFirst;
  }
});

export default function ordersReducer(state = initialState, action) {

  // console.log('------------------> orderReducer action start <----------------')
  // console.log(action)
  // console.log('------------------> orderReducer action end <----------------')

  switch (action.type) {

    case '@@redux-form/CHANGE':
      if (action.meta.field.split('.')[1] === 'category') {

        return {
          ...state,
          edited_box: {
            path: action.meta.field.split('.')[0],
            value: action.payload
          },

        };
      }

    /*************************************
     *
     *  FIND ORDER
     *
     *************************************/

    case FIND_ORDER:
      console.log('FIND_ORDER')
      return {
        ...state,
        find_order: {
          data: state.find_order.data,
          isFetching: true
        }
      };

    case FIND_ORDER_SUCCESS:
      console.log('FIND_ORDER_SUCCESS')
      return {
        ...state,
        find_order: {
          data: action.response.payload,
          isFetching: false
        }
      };

    case FIND_ORDER_FAILURE:
      return {
        ...state,
        find_order: {
          data: state.find_order.data,
          isFetching: false
        }
      };



    /*************************************
     *
     *  FETCH ORDERS
     *
     *************************************/

    case FETCH_ORDERS:
      return {
        ...state,
        orders: {
          data: state.orders.data,
          isFetching: true
        }
      };

    case FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        orders: {
          data: action.response.payload,
          isFetching: false
        }
      };

    case FETCH_ORDERS_FAILURE:
      return {
        ...state,
        orders: {
          data: state.orders.data,
          isFetching: false
        }
      };

    /*************************************
     *
     *  FETCH ORDERS2
     *
     *************************************/

    case FETCH_ORDERS2:
      return {
        ...state,
        orders2: {
          data: state.orders2.data,
          isFetching: true
        }
      };

    case FETCH_ORDERS2_SUCCESS:
      return {
        ...state,
        orders2: {
          data: action.response.payload,
          isFetching: false
        }
      };

    case FETCH_ORDERS2_FAILURE:
      return {
        ...state,
        orders2: {
          data: state.orders2.data,
          isFetching: false
        }
      };


    /*************************************
     *
     *  FETCH ORDERS3
     *
     *************************************/

    case FETCH_ORDERS3:
      return {
        ...state,
        orders3: {
          data: state.orders3.data,
          isFetching: true
        }
      };

    case FETCH_ORDERS3_SUCCESS:
      return {
        ...state,
        orders3: {
          data: action.response.payload,
          isFetching: false
        }
      };

    case FETCH_ORDERS3_FAILURE:
      return {
        ...state,
        orders3: {
          data: state.orders3.data,
          isFetching: false
        }
      };


    /*************************************
     *
     *  FETCH ORDER DETAILS
     *
     *************************************/

    case FETCH_ORDER_DETAILS:
      return {
        ...state,
        order_details: {
          data: state.order_details.data,
          isFetching: true
        }
      };

    case FETCH_ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        order_details: {
          data: action.response.payload,
          isFetching: false
        }
      };

    case FETCH_ORDER_DETAILS_FAILURE:
      return {
        ...state,
        order_details: {
          data: state.order_details.data,
          isFetching: false
        }
      };



    /*************************************
     *
     *  FETCH ORDER PAYMENTS
     *
     *************************************/

    case FETCH_ORDER_PAYMENTS:
      return {
        ...state,
        order_payments: {
          data: state.order_payments.data,
          isFetching: true
        }
      };

    case FETCH_ORDER_PAYMENTS_SUCCESS:
      return {
        ...state,
        order_payments: {
          data: action.response.payload,
          isFetching: false
        }
      };

    case FETCH_ORDER_PAYMENTS_FAILURE:
      return {
        ...state,
        order_payments: {
          data: state.order_payments.data,
          isFetching: false
        }
      };

      /*************************************
     *
     *  FETCH LOYALTYPOINTS
     *
     *************************************/

    case FETCH_POINTS:
      console.log('FETCH_POINTS')
      return {
        ...state,
        loyalty_points: {
          data: state.loyalty_points.data,
          isFetching: true
        }
      };

    case FETCH_POINTS_SUCCESS:
      console.log('FETCH_POINTS_SUCCESS')
      return {
        ...state,
        loyalty_points: {
          data: action.response.payload,
          isFetching: false
        }
      };

    case FETCH_POINTS_FAILURE:
      return {
        ...state,
        loyalty_points: {
          data: state.loyalty_points.data,
          isFetching: false
        }
      };

    case 'DESTROY_STATE_DATA3':
      state = initialState
      return state;

    default: {
      return state;
    }
  }
}
