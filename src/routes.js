import React from 'react'
import 'babel-polyfill'
import { Route, IndexRoute } from 'react-router'
import App from './containers/App'
import Login from './components/Login_Semantic'
import Logout from './components/Logout'
import ErrorPage from './components/ErrorPage';
import SideBar from './components/common/SideBar'
import Auth from './auth/authenticator'


export default (


<Route path="/" component={App}>
  <IndexRoute component={SideBar} onEnter={requireAuth}  />
  <Route path="/login" component={Login} />
  <Route path="/logout" component={Logout} />

  {/*<Route path="/test_LoginForm" component={Login}  onEnter={requireAuth} />*/}

  {/*<Route path="/test_Orders" component={Orders} onEnter={requireAuth} />*/}
  {/*<Route path="/test_Table" component={TestTable} onEnter={requireAuth} />*/}


  {/*<Route path="/test_SideBar" component={SideBar} onEnter={requireAuth} />*/}
  <Route path="*" component={ErrorPage} />
</Route>

);


function requireAuth(nextState, replace) {
  if (!Auth.loggedIn()) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}
