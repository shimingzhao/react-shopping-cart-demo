import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Segment, Table, Dimmer, Loader} from 'semantic-ui-react'

import {change, formValueSelector, reduxForm} from 'redux-form'

import {Values} from 'redux-form-website-template'

import {loadDashboard} from '../../actions/dashboardAction'


const loadDashboardData = props => {
  console.log('loading dashboard data');
  props.actions.loadDashboard()
}

const isEmpty = (obj) => {
  for(var key in obj) {
    if(obj.hasOwnProperty(key))
      return false;
  }
  return true;
}

class Dashboard extends Component {
  constructor(props) {
    super(props)
  }

  handleItemClick = (e, { name }) => {
    this.props.dispatch(change('dashboard', 'activeItem', name))
  }


  componentDidMount(){
    console.log('=============> Dashboard componentDidMount <===')
    this.props.dispatch(change('dashboard','selected_row',''))
    loadDashboardData(this.props)
    console.log(this.props)
    console.log('============> Dashboard componentDidMount DONE! <===')
  }

  // renderChildren() {
  //   return React.Children.map(this.props.children, child => {
  //     return React.cloneElement(child, { })
  //   })
  // }

  render() {
    const {
      dashboard,
      year,
      days,
      customerid,
      // order_details,
      // order_payments,
      // children,
      // offset,
      // total,
      // limit,
      // page,
      // pages,
      //
      // search_field,
      // selected_row,
      // selected_row2,
      activeItem,

    } = this.props;
    console.log('dashboard render')
    console.log(year)
    // console.log(page)
    // console.log(pages)
    // console.log(total)
    // console.log(limit)
    //console.log(selected_row2)
    //console.log(activeItem)
    //
    // if(children !== null){
    //   return (
    //     <div>
    //       {/*{this.renderChildren()}*/}
    //     </div>
    //   );
    // }
    // else{
    return (
      <Segment>
        {/* Dashboard here */}
          {/*<Segment style={{display: activeItem === 'list' ? '' : 'none' }}>*/}
            {/*<Cards value = {total}/>*/}
            {/*<Segment attached='top'>*/}
        {/*<Dimmer active={dashboard.isFetching ? true : false} inverted>*/}
          {/*<Loader active inverted content='Loading' />*/}
        {/*</Dimmer>*/}
              <Table celled selectable sortable>
                <Table.Header>
                  <Table.Row className="HeaderRow">
                    <Table.HeaderCell >ACTYEAR</Table.HeaderCell>
                    <Table.HeaderCell >ALL_ORDERS</Table.HeaderCell>
                    <Table.HeaderCell >CUSTID</Table.HeaderCell>
                    <Table.HeaderCell >ORDERS_LAST_180_DAYS</Table.HeaderCell>
                    <Table.HeaderCell >ORDERS_LAST_30_DAYS</Table.HeaderCell>
                    <Table.HeaderCell >ORDERS_LAST_90_DAYS</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>

                <Table.Body id='ordersTableBody'>

                 {
                    (dashboard !== undefined && dashboard.data !== undefined && dashboard.isFetching === false && dashboard.data.data !== undefined) ?
                      dashboard.data.data.map( (row, index) => (
                        <Table.Row key={index}>
                          <Table.Cell
                            // active={(year === dashboard.data.data[index].ACTYEAR) && true}
                            onClick={
                              ()=>{
                                console.log('CLICKED!')
                                console.log(dashboard.data.data[index].ACTYEAR)
                                this.props.dispatch(change('dashboard', 'year', dashboard.data.data[index].ACTYEAR))
                              }
                            }
                          > {row.ACTYEAR}
                          </Table.Cell>
                          <Table.Cell>{row.ALL_ORDERS}</Table.Cell>
                          <Table.Cell onClick={()=>this.props.dispatch(change('dashboard', 'customerid', row.CUSTID))}>{row.CUSTID}</Table.Cell>
                          <Table.Cell onClick={()=>{this.props.dispatch(change('dashboard', 'days', 180))}}>{row.ORDERS_LAST_180_DAYS}</Table.Cell>
                          <Table.Cell onClick={()=>{this.props.dispatch(change('dashboard', 'days', 30))}}>{row.ORDERS_LAST_30_DAYS}</Table.Cell>
                          <Table.Cell onClick={()=>{this.props.dispatch(change('dashboard', 'days', 90))}}>{row.ORDERS_LAST_90_DAYS}</Table.Cell>
                        </Table.Row>
                      ))
                      :
                      (dashboard !== undefined && dashboard.data !== undefined && dashboard.isFetching === true && dashboard.data.data !== undefined) ?
                        dashboard.data.data.map( (row, index) => (
                          <Table.Row key={index}>
                            <Table.Cell>{row.ACTYEAR}</Table.Cell>
                            <Table.Cell>{row.ALL_ORDERS}</Table.Cell>
                            <Table.Cell>{row.CUSTID}</Table.Cell>
                            <Table.Cell>{row.ORDERS_LAST_180_DAYS}</Table.Cell>
                            <Table.Cell>{row.ORDERS_LAST_30_DAYS}</Table.Cell>
                            <Table.Cell>{row.ORDERS_LAST_90_DAYS}</Table.Cell>
                          </Table.Row>
                        ))
                        :
                        ''
                  }

                </Table.Body>

                <Table.Footer>
                  <Table.Row>
                    <Table.HeaderCell colSpan='6'>

                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Footer>
              </Table>
            {/*</Segment>*/}
          {/*</Segment>*/}


      </Segment>


    )

  }
  //}
}

Dashboard.propTypes = {
  dashboard: PropTypes.object.isRequired,
  // carriers: PropTypes.object.isRequired,
  // children: PropTypes.object,
  //selected_rows: PropTypes.array.isRequired
};


const selector = formValueSelector('dashboard')

Dashboard = reduxForm({
  form: 'dashboard', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  //validate
})(Dashboard)

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({loadDashboard}, dispatch),
  dispatch: dispatch
});

export default connect(
  state => {

    // let offset = 0;
    // let total = 0;
    // let limit = 0;
    // let page = 0;
    // let pages = 0;

    // if(state.dashboard_stuff.dashboard !== undefined && state.dashboard_stuff.dashboard.data !== undefined && !isEmpty(state.dashboard_stuff.dashboard.data)) {
    //   page = state.orders_stuff.dashboard.data.page;
    //   pages = state.orders_stuff.dashboard.data.pages;
    //   total = state.orders_stuff.dashboard.data.total;
    //   limit = state.orders_stuff.dashboard.data.per_page;
    //   offset = (page - 1) * limit + 1
    // }

    // let search_field = selector(state, 'search_field')
    let year = selector(state, 'year')
    let days = selector(state, 'days')
    let customerid = selector(state, 'customerid')
    if(year === undefined || year === ''){
      year = ''
    }
    if(days === undefined || days === ''){
      days = ''
    }
    if(customerid === undefined || customerid === ''){
      customerid = ''
    }
    console.log(year)
    console.log(customerid)
    console.log(days)
    // let activeItem = selector(state, 'activeItem')

    // if(search_field === undefined || search_field === ''){
    //   search_field = ''
    // }
    //
    // if(selected_row === undefined || selected_row === ''){
    //   selected_row = ''
    // }
    //
    // if(activeItem === undefined || activeItem === ''){
    //   activeItem = 'list'
    // }


    return {
      dashboard: state.dashboard_stuff.dashboard,
      // order_details: state.orders_stuff.order_details,
      // order_payments: state.orders_stuff.order_payments,
      //
      // search_field: search_field,
      year: year,
      days: days,
      customerid: customerid,
      //
      //
      // offset: offset,
      // total: total,
      // limit: limit,
      // page: page,
      // pages: pages,
  }}
  ,mapDispatchToProps)(Dashboard);

