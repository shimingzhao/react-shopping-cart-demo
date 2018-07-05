import React from 'react'
import PropTypes from 'prop-types'
import { Link, IndexLink } from 'react-router'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {browserHistory} from 'react-router'
import { Values } from 'redux-form-website-template'
import { setLanguages, addTranslation, setActiveLanguage, getTranslate } from 'react-localize-redux'

import renderSelectField from '../semantic/common/SelectField_Semantic'
import renderLanguage from '../semantic/common/SelectField_Semantic00'
import renderSelectField_inline from '../semantic/common/SelectField_Semantic0'

import {
  reduxForm,
  Field,
  formValueSelector,
  //reset,
  initialize,
  touch,
  blur,
  //FieldArray,
  //change
  startAsyncValidation,
  startSubmit
} from 'redux-form'

import {
  Form,
  Button,
  Dropdown,
  Menu,
  Header,
  //Icon,
  Flag,
} from 'semantic-ui-react'

import Auth from '../../auth/authenticator'

import {
  signout
} from '../../actions/sessionActions'

const countryOptions = [
  { text: 'English', value: 'ca', flag: 'ca', key: 'ca' },
  { text: 'Français', value: 'fr', flag: 'fr', key: 'fr' },
  { text: 'Espagnol', value: 'es', flag: 'es', key: 'es', disabled: true}
]

const renderField = (field) => (
  <div>
    <input className='prompt' type='text' {...field.input} placeholder='Search...' />
  </div>
)

const openInNewTab = url => {
    let win = window.open(url, "_blank");
    win.focus();
};


class Header2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeItem: 'home' }

    //this.handleItemClick = this.handleItemClick.bind(this)
  }

  static propTypes = {
    session_data: React.PropTypes.object.isRequired,
  }

  handleItemClick = (e, { name }) =>
  {
    this.setState({ activeItem: name })
    console.log(name)
    browserHistory.push(('/test_SideBar'))
  }

  handleSubmitHandler = (event) => {
  }

  componentDidMount() {
    const initialFormData = {
      "activeLanguage": "fr"
    }
    this.props.dispatch(initialize('header', initialFormData))
  }



  render() {

    const {
      session_data,
      activeItem,
      activeLanguage,

      /// FORM SPECIFIC
      handleSubmit,
      error,
      valid,
      pristine,
      //reset,
      submitting,

      translate,

    } = this.props;

    //console.log('------> Header2 render <------')

      const imageStyle = {
          paddingLeft: "10px",
          paddingTop: "8px"
      };


      return (

      <div>
        {/*<Form*/}
          {/*//size='large'*/}
              {/*onSubmit={handleSubmit(this.handleSubmitHandler)}>*/}

          <Menu borderless size='small'>
              <a href="http://www.multidev.com" target="_blank">
                  <img
                      style={imageStyle}
                      src={"http://www.multidev.com/img/multidev-technologies-logo.png"}
                  />
              </a>

{/*            {
              (Auth.loggedIn())
                ?
                <Menu.Menu position='left'>
                  <Menu.Item name="Orders" active={activeItem === 'home'} onClick={this.handleItemClick} />
                </Menu.Menu>
                :
                ''
            }*/}


            {/* <Menu.Item name='messages' active={activeItem === 'messages'} onClick={this.handleItemClick} />
            <Menu.Item name='shipments' active={activeItem === 'shipments'} onClick={this.handleItemClick} />
            <Menu.Item name='new shipment' active={activeItem === 'newshipment'} onClick={this.handleItemClick} /> */}



            <Menu.Menu position='right'>
              {/*<Menu.Item>*/}
                {/*<Form>*/}
                  {/*<div className='ui right aligned category search item'>*/}
                    {/*<div className='ui transparent icon input'>*/}

                      {/*<Field*/}
                        {/*name="search_field"*/}
                        {/*component={renderField}*/}
                        {/*onChange={(e, value) => {*/}

                          {/*//console.log('search onChange')*/}
                          {/*//console.log(value)*/}
                          {/*if(value !== undefined && value != ''){*/}

                          {/*}*/}
                          {/*else{*/}
                            {/*console.log('search is empty! lets refresh grid!')*/}
                          {/*}*/}

                        {/*}}*/}
                        {/*type="text"*/}
                      {/*/>*/}

                      {/*<i className='search link icon'*/}
                         {/*onClick={()=>{*/}
                           {/*console.log('lets search via search_field ?')*/}
                           {/*//this.props.actions.loadShipmentsPaged(1, 'shipment_identification', search_field)*/}
                         {/*}}*/}
                      {/*/>*/}
                    {/*</div>*/}
                    {/*<div className='results' />*/}
                  {/*</div>*/}
                {/*</Form>*/}
              {/*</Menu.Item>*/}
              <Menu.Item>
                <Field
                  name="activeLanguage"
                  component={ renderLanguage}
                  header='Languages'
                  options={countryOptions}
                  activeLanguage={activeLanguage}
                  defaultValue={countryOptions[0].value}
                  onChange={(event, data) => {
                    if(data === 'ca')
                    {
                      this.props.dispatch(setActiveLanguage('en'));
                      sessionStorage.setItem('activeLanguage', 'en');
                    }
                    if(data === 'fr'){
                      this.props.dispatch(setActiveLanguage('fr'));
                      sessionStorage.setItem('activeLanguage', 'fr');
                    }
                    //console.log(data)
                    //this.props.dispatch(setActiveLanguage(data))
                  }}
                />
              </Menu.Item>

              <Menu.Item>
                {
                  (!Auth.loggedIn()) ?
                    <Button primary
                            onClick={() => {browserHistory.push('/login')}}
                    >{translate('header.login')}</Button>
                    :
                    <Button primary
                            onClick={() => {browserHistory.push('/logout')}}
                    >{translate('header.logout')}</Button>
                }

              </Menu.Item>
            </Menu.Menu>
          </Menu>

        {/*</Form>*/}

        {/* <div>
            <Values form="header" />
          </div> */}

      </div>





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

const selector = formValueSelector('header')

Header2 = reduxForm({
  form: 'header', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  //validate
})(Header2)


const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({signout}, dispatch),
  dispatch: dispatch
});

export default connect(
  state => {
    let activeLanguage = selector(state, 'activeLanguage')
    //let trans = getTranslate(state.locale)

    sessionStorage.setItem('activeLanguage', activeLanguage === 'ca' ? 'en' : activeLanguage === 'fr' ? 'fr' : 'fr');
    //sessionStorage.setItem('translate', trans);

    return {
      session_data: state.session_stuff.data,
      activeLanguage,
      translate: getTranslate(state.locale),
    }
  },
  mapDispatchToProps
)(Header2);
