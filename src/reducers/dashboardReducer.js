import {
  FETCH_DASHBOARD,
  FETCH_DASHBOARD_SUCCESS,
  FETCH_DASHBOARD_FAILURE,
} from '../actions/dashboardAction';

const initialState = {
  dashboard: {
    data: [],
    isFetching: false
  },
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
  groupByMulti: function(list, values, context) {
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

export default function dashboardReducer(state = initialState, action) {

  console.log('---------------> dashboardReducer action start <--------------')
  console.log(action)
  console.log('---------------> dashboardReducer action end <--------------')
  switch (action.type) {
    case '@@redux-form/CHANGE':
      if(action.meta.field.split('.')[1] === 'category'){

        return { ...state,

          edited_box: {
            path: action.meta.field.split('.')[0],
            value: action.payload
          },

        };
      }

    /*************************************
     *
     *  FETCH DASHBOARD
     *
     *************************************/

    case FETCH_DASHBOARD:
      return {
        ...state,
        dashboard: {
          data: state.dashboard.data,
          isFetching: true
        }
      };

    case FETCH_DASHBOARD_SUCCESS:
      return {
        ...state,
        dashboard: {
          data: action.response.payload,
          isFetching: false
        }
      };

    case FETCH_DASHBOARD_FAILURE:
      return {
        ...state,
        dashboard: {
          data: state.dashboard.data,
          isFetching: false
        }
      };



    case 'DESTROY_STATE_DATA3':
      state = initialState
      return state;

    default:
    {
      return state;
    }
  }
}
