import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import routes from '../routes'
import DevTools from './DevTools'
import { Router, browserHistory } from 'react-router'

const Root = ({ store, browserHistory }) => (
  <Provider store={store}>
    <div>
      <Router history={browserHistory} routes={routes} />
      <DevTools />
    </div>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired,
  browserHistory: PropTypes.object.isRequired
}

export default Root
