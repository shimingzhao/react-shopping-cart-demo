import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {browserHistory} from 'react-router'
import {Button, Form, Grid, Header, Message, Segment} from 'semantic-ui-react'
import {Field, formValueSelector, reduxForm} from 'redux-form'
import {getTranslate} from 'react-localize-redux'
import renderTextField from './semantic/common/TextField_Semantic'
import {authenticate} from '../actions/sessionActions'

//import LogoImg from '../assets/img/multidev.svg';

//import 'babel-polyfill';

//import publickey from '../assets/public.pem'

const config = {
  form: 'LoginForm',
  enableReinitialize: false,
  onSubmitSuccess: () => {
    console.log('onSubmitSuccess called (yes, yes I do get called');
  }
  //validate: validate
}

const required = value => (value ? undefined : 'Required')
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength50 = maxLength(50)
export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined
export const minLength2 = minLength(2)

const isEmpty = (obj) => {
  for(var key in obj) {
    if(obj.hasOwnProperty(key))
      return false;
  }
  return true;
}

class Login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      credentials: {
        username: '',
        password: '',
        isOpened: true,
        visible: true
      }
    }
  }

  static propTypes = {
    session_data: React.PropTypes.object.isRequired,
  }


  componentWillUpdate(nextProps, nextState) {

    //console.log('Login componentWillUpdate');

    if(!!sessionStorage.jwt){
      //console.log('WOOOHOOOO!')
      browserHistory.push('/')
      // browserHistory.push('/test_SideBar')
    }
    else{
      //console.log('BOOOO!')
    }

    //console.log('Login componentWillUpdate DONE');
  }

  componentDidMount(){

    console.log('Login componentDidMount');
    console.log('here are query params')
    console.log(this.props.location.query);
    //console.log(this.props.params);

    let access_token = (isEmpty(this.props.location.query.access_token).length != 0 ) ? this.props.location.query.access_token : session.jwt;
    let shipTo = {};
    let shipFrom = {};

    var jwt = require('jsonwebtoken');

    console.log(access_token);

    if(access_token !== undefined && access_token !== ''){

      console.log('decodeding via npm jsonwebtoken')

      try {

        console.log('need to decode key here')
        console.log('decoded')
        console.log(decoded)
        sessionStorage.setItem('jwt', access_token);
      }
      catch (e) {
        if (e.name === 'TokenExpiredError') {
          console.log('401 Token Expired!')
          sessionStorage.removeItem('jwt');
          this.props.dispatch({type: 'TOKEN_EXPIRED'})

        } else {
          console.log('401 Authentication failed!')
          sessionStorage.removeItem('jwt');
        }
      }

    }
    else{

      console.log('lets check jwt token')
      //console.log(sessionStorage.getItem('jwt'))

      if(sessionStorage.getItem('jwt') !== undefined && sessionStorage.getItem('jwt') !== null){

        try {

          let decoded = jwt.verify(sessionStorage.getItem('jwt'), publicRSAKey)
          console.log('decoded')
          console.log(decoded)

        }
        catch (e) {
          if (e.name === 'TokenExpiredError') {
            console.log('401 Token Expired!')
            sessionStorage.removeItem('jwt');
            this.props.dispatch({type: 'TOKEN_EXPIRED'})
          } else {
            console.log('401 Authentication failed!')
            sessionStorage.removeItem('jwt');
          }
        }
      }
    }

  }

  handleSubmitHandler = (event, props) => {
    //console.log('handleSubmit clicked!')
    let credentials = {
      username: event.username,
      password: event.password,
      email: event.email,
      md_client_id: event.md_client_id
    };
    props.actions.authenticate(credentials)
  }

  render() {

    const {
      handleSubmit,
      pristine,
      submitting,
      clearForm,
      valid,
      username,
      password,
      md_client_id,
      email,
      session_data,
      form_data,
      translate
    } = this.props;

    console.log('------> Login render <------')

    return (

      <div className='login-form'>
        {/*
        Heads up! The styles below are necessary for the correct render of this example.
        You can do same with CSS, the main idea is that all the elements up to the `Grid`
        below must have a height of 100%.
      */}
        {/* <style>{`
        body > div,
        body > div > div,
        body > div > div > div.login-form {
          height: 100%;
        }
      `}</style> */}

        <Segment
          attached='top'
        >
          <Grid
            //textAlign='center'
            style={{ height: '100%' }}
            verticalAlign='middle'
            centered
          >
            <Grid.Column style={{ maxWidth: 450 }}>

              <Form size='large'

                    onSubmit={handleSubmit((values) => {

                      console.log('MY LOGIN SUBMIT CLICKED')
                      console.log(values)

                      var credentials = {
                        username: values.username,
                        password: values.password,
                        email: values.email,
                        md_client_id: values.md_client_id
                      };
                      console.log(credentials)
                      this.props.actions.authenticate(credentials)

                    })}

              >

                <Header as='h3' attached='top'>
                  {/* <Icon name='lock' /> */}
                  { translate('login.title') }
                </Header>



                <Segment stacked attached>

                  <Field
                    fluid
                    name="username"
                    component={renderTextField}
                    label={translate('login.form.username')}
                    icon="user"
                    iconPosition="left"
                    validate={[required, maxLength50, minLength2]}
                  />

                  <Field
                    fluid
                    name="password"
                    component={renderTextField}
                    label={translate('login.form.password')}
                    icon="lock"
                    iconPosition="left"
                    type='password'
                    validate={[required, maxLength50, minLength2]}
                  />

                  <Field
                    fluid
                    name="email"
                    component={renderTextField}
                    label="email"
                    icon="user"
                    iconPosition="left"
                    validate={[required, maxLength50, minLength2]}
                  />

                  <Field
                    fluid
                    name="md_client_id"
                    component={renderTextField}
                    label="md_client_id"
                    icon="user"
                    iconPosition="left"
                    validate={[required, maxLength50, minLength2]}
                  />


                  <Button

                    disabled={!valid || pristine || submitting}

                    loading={(session_data && session_data.isFetching == true) && true}

                    positive={(session_data && (session_data.isFetching == false && session_data.session == true )) && true}

                    negative={(session_data && (session_data.isFetching == false && session_data.error !== null && session_data.error.code === 401 )) && true}

                    type="submit"
                    color='teal'
                    fluid
                    size='large'>
                    {translate('login.buttons.login')}
                  </Button>

                  <Message
                    //onDismiss={this.handleDismiss}
                    hidden={
                      (
                        (session_data && (isEmpty(session_data.error)))
                        //||
                        //(form_data && (isEmpty(form_data.syncErrors)))
                      ) && true
                    }

                    visible={
                      (
                        (session_data && (session_data.isFetching == false && (!isEmpty(session_data.error) && session_data.error.code === 401 )))
                        //||
                        //(form_data && (!isEmpty(form_data.syncErrors)))
                      ) && true
                    }

                    negative={
                      (
                        (session_data && (session_data.isFetching == false && (!isEmpty(session_data.error) && session_data.error.code === 401 )))
                        //||
                        //(form_data && (!isEmpty(form_data.syncErrors)))
                      )
                      && true
                    }>

                    <Message.Header>{translate('login.authresult.result')}</Message.Header>
                    <p>{session_data.error.message}</p>
                    {/* {
                      (form_data && !isEmpty(form_data.syncErrors))
                      ?
                        <div>
                          {!isEmpty(form_data.syncErrors.username)
                            ?
                              <p>Username: {form_data.syncErrors.username}</p>
                            :
                              ''
                          }
                          {!isEmpty(form_data.syncErrors.password)
                            ?
                              <p>Password: {form_data.syncErrors.password}</p>
                            :
                              ''
                          }
                        </div>
                      :
                      ''
                    } */}
                  </Message>


                  <Message



                    hidden={
                      (
                        //(session_data && (isEmpty(session_data.error)))
                        //||
                        (form_data && (isEmpty(form_data.syncErrors)))
                      ) && true
                    }

                    visible={
                      (
                        //(session_data && (session_data.isFetching == false && (!isEmpty(session_data.error) && session_data.error.code === 401 )))
                        //||
                        (form_data && (!isEmpty(form_data.syncErrors)))
                      ) && true
                    }

                    negative={
                      (
                        //(session_data && (session_data.isFetching == false && (!isEmpty(session_data.error) && session_data.error.code === 401 )))
                        //||
                        (form_data && (!isEmpty(form_data.syncErrors)))
                      )
                      && true
                    }>

                    <Message.Header>{translate('login.authresult.review')}</Message.Header>
                    {
                      (form_data && !isEmpty(form_data.syncErrors))
                        ?
                        <div>
                          {!isEmpty(form_data.syncErrors.username)
                            ?
                            <p>{translate('login.form.username')}: {form_data.syncErrors.username}</p>
                            :
                            ''
                          }
                          {!isEmpty(form_data.syncErrors.password)
                            ?
                            <p>{translate('login.form.password')}: {form_data.syncErrors.password}</p>
                            :
                            ''
                          }
                        </div>
                        :
                        ''
                    }
                  </Message>

                </Segment>



              </Form>
              {/* <Message>
                New to us? <a href='#'>Sign Up</a>
              </Message> */}



            </Grid.Column>
          </Grid>
        </Segment>


      </div>
    );
  }
}

const selector = formValueSelector('LoginForm')

Login = reduxForm(config)(Login)

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({authenticate}, dispatch),
  dispatch: dispatch
});

export default connect(
  state => {
    const username = selector(state, 'username')
    const password = selector(state, 'password')
    const email = selector(state, 'email')
    const md_client_id = selector(state, 'md_client_id')

    return {
      username,
      password,
      email,
      md_client_id,
      session_data: state.session_stuff.data,
      form_data: state.form.LoginForm,
      translate: getTranslate(state.locale),
    }
  }, mapDispatchToProps
)(Login);
