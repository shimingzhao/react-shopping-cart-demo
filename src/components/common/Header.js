import React from 'react'
import PropTypes from 'prop-types'
import { Link, IndexLink } from 'react-router'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {browserHistory} from 'react-router'

import Auth from '../../auth/authenticator'

import {
  signout
} from '../../actions/sessionActions'

class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    session_data: React.PropTypes.object.isRequired,
  }

  render() {

    const {
      session_data
    } = this.props;

    //console.log('------> Header render <------')

      return (
        <nav>

          <IndexLink to="/" activeClassName="active">Home</IndexLink>
          {" | "}

          <Link to="/about" activeClassName="active">About</Link>
          {" | "}

          <Link to="/test_LoginForm" activeClassName="active">test_LoginForm</Link>
          {" | "}

          <Link to="/test_WizardForm" activeClassName="active">test_WizardForm</Link>
          {" | "}

          <Link to="/test_Shipments" activeClassName="active">test_Shipments</Link>
          {" | "}

          <Link to="/test_Clients" activeClassName="active">test_Clients</Link>
          {" | "}

          <Link to="/test_Form" activeClassName="active">test_Form</Link>
          {" | "}

          {/* <Link to="/test_Admin" activeClassName="active">test_Admin</Link>
          {" | "} */}


          {
              (!(Auth.loggedIn()) && (session_data.session === false)) ?
              <Link to="/login" activeClassName="active">
                log in</Link>
              :
              <Link to="/logout" activeClassName="active">
                log out</Link>

          }
        </nav>
      );

  }
}

// Header.propTypes = {
//   actions: PropTypes.object.isRequired
// }
//
// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators(sessionActions, dispatch)
//   };
// }
//
// function mapStateToProps(state, ownProps) {
//   return {logged_in: state.session};
// }

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({signout}, dispatch),
  dispatch: dispatch
});

export default connect(
    state => {
      return {
        session_data: state.session_stuff.data,
      }
    },
    mapDispatchToProps
)(Header);
