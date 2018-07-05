import React from 'react';
import { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux';
import {browserHistory} from 'react-router'

import {
  reduxForm,
  // Field,
  // formValueSelector,
  reset,
  // initialize,
  // touch,
  // change
} from 'redux-form'

import {
  signout
} from '../actions/sessionActions'

class Logout extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    console.log('Logout componentWillMount')

    browserHistory.push('/login')

    console.log('Logout clearning all forms datas')
    /// LETS DELETE ALL FORMS DATAs
    this.props.dispatch(reset('wizard'))
    this.props.dispatch(reset('clients'))
    this.props.dispatch(reset('newclient'))
    console.log('Logout DONE clearning all forms datas')


    console.log('Logout calling @@redux/INIT')
    this.props.dispatch({type: '@@redux/INIT'})
    console.log('Logout DONE calling @@redux/INIT')


    console.log('Logout calling signout')
    //this.props.actions.signout();
    this.props.dispatch(signout())
    console.log('Logout DONE calling signout')


    console.log('Logout calling dispatch DESTROY_STATE_DATA')
    this.props.dispatch({type: 'DESTROY_STATE_DATA'})
    this.props.dispatch({type: 'DESTROY_STATE_DATA2'})
    this.props.dispatch({type: 'DESTROY_STATE_DATA3'})    
    console.log('Logout DONE calling dispatch DESTROY_STATE_DATA')

    //this.props.router.replace('/login')
    //this.props.dispatch(authActionCreators.logout())
  }

  render() {
    console.log('----> LOGOUT RENDER <----')
    console.log(this.props)
    return <div>Sorry to see you go!</div>;
  }
}
Logout.propTypes = {
  dispatch: PropTypes.func.isRequired,
  router: PropTypes.object.isRequired
}

Logout = reduxForm({
  form: 'logout', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  //validate

})(Logout)

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({signout}, dispatch),
  dispatch: dispatch
});


export default connect(
  null,
  mapDispatchToProps)(withRouter(Logout))
