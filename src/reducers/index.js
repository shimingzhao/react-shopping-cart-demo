import { routerReducer as routing } from 'react-router-redux'
import {combineReducers} from 'redux';
import orders_stuff from './ordersReducer';
import session_stuff from './sessionReducer';
// import dashboard_stuff from './dashboardReducer';
//import formReducer from './formReducer';
import { reducer as reduxFormReducer } from 'redux-form';
import { localeReducer } from 'react-localize-redux';

const rootReducer = combineReducers({
  // short hand property names
  orders_stuff,
  session_stuff,
  // dashboard_stuff,
  //orders2_stuff,
  //formReducer,
  form: reduxFormReducer, // mounted under "form"
  routing,
  locale: localeReducer
})

export default rootReducer;
