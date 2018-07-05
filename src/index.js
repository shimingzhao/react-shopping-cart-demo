import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import 'babel-polyfill'
import { useBasename } from 'history'
import {Router, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
//import Root from './containers/Root'
import configureStore from './store/configureStore'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { setLanguages, addTranslation, initialize } from 'react-localize-redux'
import routes from './routes'
import config from './config'
import Footer from './components/common/Footer'

const json = require('./assets/translations.json')

require('./stylesheets/main.scss');

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const languages = ['en', 'fr', 'es'];
const store = configureStore()

// console.log('index.js')
// console.log(process.env.NODE_ENV)

let history = {}

if(process.env.NODE_ENV === 'production'){
  history = useBasename(() => browserHistory)({ basename: BASENAME })
}
else if(process.env.NODE_ENV === 'development'){
  history = syncHistoryWithStore(browserHistory, store)
}else{
  history = syncHistoryWithStore(browserHistory, store)
}


//store.dispatch(setLanguages(languages))
//store.dispatch(initialize(languages));
//store.dispatch(setLanguages(languages, { defaultLanguage: 'fr' }))


store.dispatch(addTranslation(json))
//store.dispatch(setLanguages(languages))
//store.dispatch(setLanguages(languages, { defaultLanguage: 'fr' }))
store.dispatch(setLanguages(languages, 'fr'))




render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.getElementById('root')
);
render(<Footer />, document.getElementById('footer'));
