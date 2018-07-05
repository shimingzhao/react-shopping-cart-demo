import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Cards from './Cards'
import Dashboard from './Dashboard'
import {browserHistory} from 'react-router'
import { getTranslate , getActiveLanguage } from 'react-localize-redux'
import {
  Icon,
  Card,
  Label,
  Menu,
  Table,
  Button,
  Dimmer,
  Loader,
  Input,
  Checkbox,
  Form,
  Dropdown,
  Segment,
  Statistic,
  Message,
  Modal,
  Header,
  Grid,
  Tab
} from 'semantic-ui-react'

import renderTextField from './common/TextField_Semantic'

import {
  reduxForm,
  Field,
  formValueSelector,
  reset,
  initialize,
  touch,
  FieldArray,
  change
} from 'redux-form'

import { Values } from 'redux-form-website-template'

import {
  loadAllOrders,
  loadOrder,
  loadOrderPayments
} from '../../actions/ordersActions'

import CreateNewTable from './OrderDetailsPayments'

const loadAllOrdersData = props => {
  console.log('loading all orders page 1')
  props.actions.loadAllOrders(1)
}

const isEmpty = (obj) => {
  for(var key in obj) {
    if(obj.hasOwnProperty(key))
      return false;
  }
  return true;
}

class Orders3 extends Component {
  constructor(props) {
    super(props)
  }

  handleItemClick = (e, { name }) => {
    this.props.dispatch(change('orders', 'activeItem', name))
  }

  componentDidMount(){
    console.log('===> Orders3 componentDidMount <===')
    this.props.dispatch(change('orders','selected_row',''))
    loadAllOrdersData(this.props)

    console.log('===> Orders3 componentDidMount DONE! <===')
  }

  // renderChildren() {
  //   return React.Children.map(this.props.children, child => {
  //     return React.cloneElement(child, { })
  //   })
  // }

  render() {

    const {
      orders,
      order_details,
      order_payments,
      children,
      offset,
      total,
      limit,
      page,
      pages,

      search_field,
      selected_row,
      selected_row2,
      activeItem,

    } = this.props;


    // console.log('------> Orders3 render <------')
    // console.log(`props ${this.props}`)
    // console.log(`offset ${offset}`)
    // console.log(page)
    // console.log(pages)
    // console.log(total)
    // console.log(`limit ${limit}`)
    // console.log(selected_row2)
    // console.log(activeItem)
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
        <div>
          {/* Orders3 here */}
          {/*<Segment.Group>*/}
            <div style={{display: activeItem === 'list' ? '' : 'none' }}>
              <Dashboard />
              <Cards value = {total}/>
              <Segment>
                <Table celled selectable sortable>
                  <Table.Header>

                    {/* <Table.Row>
                    <Table.HeaderCell colSpan='6'>
                    </Table.HeaderCell>
                  </Table.Row> */}

                    <Table.Row className="HeaderRow">
                      <Table.HeaderCell >CUSTPO</Table.HeaderCell>
                      <Table.HeaderCell >balance</Table.HeaderCell>
                      <Table.HeaderCell >currid</Table.HeaderCell>
                      <Table.HeaderCell >custid</Table.HeaderCell>
                      <Table.HeaderCell >invoice</Table.HeaderCell>
                      <Table.HeaderCell >orderid</Table.HeaderCell>
                      <Table.HeaderCell >parentorderid</Table.HeaderCell>

                    </Table.Row>
                  </Table.Header>

                  <Table.Body id='ordersTableBody'>
                    {
                      (orders !== undefined && orders.data !== undefined && orders.isFetching === false && orders.data.data !== undefined) ?

                        orders.data.data.map( (row, index) => {
                            return selected_row === orders.data.data[index].orderid ?
                              <Table.Row key={index} style={{display: selected_row === orders.data.data[index].orderid ? '' : 'none' }}>
                                <Table.Cell colSpan='7' >

                                  <CreateNewTable
                                    row={selected_row2}
                                    // orderDetailOrPayments = { activeItem === 'payments'? order_payments : order_details}
                                    orderDetails={order_details}
                                    orderPayments = {order_payments}
                                  />
                                  <Button  primary floated='right' content='Close'  onClick={this.props.dispatch(change('orders','selected_row',''))}/>
                                </Table.Cell>
                              </Table.Row>
                              :
                              <Table.Row key={index}
                                         active={(selected_row === orders.data.data[index].orderid) && true}
                                         onClick={() => {
                                           console.log('row click')
                                           if(selected_row === orders.data.data[index].orderid){
                                             this.props.dispatch(change('orders','selected_row',''))
                                             this.props.dispatch(change('orders','selected_row2',''))
                                           }
                                           else{
                                             console.log('orders.data.data[index].orderid')
                                             console.log(orders.data.data[index].orderid)
                                             this.props.dispatch(change('orders','selected_row',orders.data.data[index].orderid))
                                             this.props.dispatch(change('orders','selected_row2',orders.data.data[index]))
                                             this.props.actions.loadOrderPayments(1, orders.data.data[index].orderid)
                                             this.props.actions.loadOrder(1, orders.data.data[index].orderid)
                                           }
                                         }
                                         }

                              >
                                <Table.Cell>{row.CUSTPO}</Table.Cell>
                                <Table.Cell>{row.balance}</Table.Cell>
                                <Table.Cell>{row.currid}</Table.Cell>
                                <Table.Cell>{row.custid}</Table.Cell>
                                <Table.Cell>{row.invoice}</Table.Cell>
                                <Table.Cell>{row.orderid}</Table.Cell>
                                <Table.Cell>{row.parentorderid}</Table.Cell>
                              </Table.Row>

                          }
                        )
                        :
                        (orders !== undefined && orders.data !== undefined && orders.isFetching === true && orders.data.data !== undefined) ?
                          orders.data.data.map( (row, index) => {
                              return selected_row === orders.data.data[index].orderid ?
                                <Table.Row key={index} style={{display: selected_row === orders.data.data[index].orderid ? '' : 'none' }}>
                                  {/*{this.props.actions.loadOrderPayments(1, selected_row)}*/}
                                  <Table.Cell colSpan='7'>

                                    <CreateNewTable
                                      row={selected_row2}
                                      // orderDetailOrPayments = { activeItem === 'payments'? order_payments : order_details}
                                      orderDetails={order_details}
                                      orderPayments = {order_payments}
                                    />
                                    <Button primary floated='right' content='Close' onClick={()=>{this.props.dispatch(change('orders','selected_row',''))}}/>
                                  </Table.Cell>
                                </Table.Row>
                                :
                                <Table.Row key={index}
                                           active={(selected_row === orders.data.data[index].orderid) && true}
                                           onClick={() => {
                                             console.log('row click')
                                             if (selected_row === orders.data.data[index].orderid) {
                                               this.props.dispatch(change('orders', 'selected_row', ''))
                                               this.props.dispatch(change('orders', 'selected_row2', ''))
                                             }
                                             else {
                                               console.log(orders.data.data[index].orderid)
                                               this.props.dispatch(change('orders', 'selected_row', orders.data.data[index].orderid))
                                               this.props.dispatch(change('orders', 'selected_row2', orders.data.data[index]))
                                               this.props.actions.loadOrderPayments(1, orders.data.data[index].orderid)
                                               this.props.actions.loadOrder(1, orders.data.data[index].orderid)
                                             }
                                           }
                                           }

                                >
                                  <Table.Cell>{row.CUSTPO}</Table.Cell>
                                  <Table.Cell>{row.balance}</Table.Cell>
                                  <Table.Cell>{row.currid}</Table.Cell>
                                  <Table.Cell>{row.custid}</Table.Cell>
                                  <Table.Cell>{row.invoice}</Table.Cell>
                                  <Table.Cell>{row.orderid}</Table.Cell>
                                  <Table.Cell>{row.parentorderid}</Table.Cell>
                                </Table.Row>
                            }
                          )

                          :
                          ''
                    }

                  </Table.Body>

                  <Table.Footer>
                    <Table.Row>
                      <Table.HeaderCell colSpan='7'>

                        <Menu floated='right' pagination>
                          <Menu.Item>
                            page &nbsp;&nbsp;&nbsp;
                            {page} &nbsp;&nbsp;&nbsp;
                            items &nbsp;&nbsp;&nbsp;
                            {Math.min((offset), total) + '-' + Math.min((offset + limit - 1), total) + ' ' + 'of' + ' ' + total}
                          </Menu.Item>

                          <Menu.Item as='a'
                                     icon
                                     disabled={offset === 1}
                                     onClick={() => {
                                       var firstPage = this.props.orders.data.first.split('/').pop();
                                       if(typeof firstPage === 'string'){
                                         firstPage = 1;
                                       }
                                       this.props.actions.loadAllOrders(firstPage);
                                       this.props.dispatch(change('orders','selected_row',''))
                                     }}
                          >
                            <Icon name='angle double left' />
                          </Menu.Item>
                          <Menu.Item as='a'
                                     icon
                                     disabled={offset === 1}
                                     onClick={() => {
                                       var prevPage = this.props.orders.data.prev.split('/').pop();
                                       if(typeof prevPage === 'string'){
                                         prevPage = this.props.orders.data.page - 1;
                                       }
                                       this.props.actions.loadAllOrders(parseInt(prevPage));
                                       this.props.dispatch(change('orders','selected_row',''))
                                     }}
                          >
                            <Icon name='angle left' />
                          </Menu.Item>


                          <Menu.Item as='a' icon
                                     disabled={offset + limit >= total}
                                     onClick={() => {
                                       var nextPage = this.props.orders.data.next.split('/').pop();
                                       this.props.actions.loadAllOrders(parseInt(nextPage));
                                       this.props.dispatch(change('orders','selected_row',''))
                                     }}
                          >
                            <Icon name='angle right' />
                          </Menu.Item>
                          <Menu.Item as='a'
                                     icon
                                     disabled={offset + limit >= total}
                                     onClick={() => {
                                       var lastPage = this.props.orders.data.last.split('/').pop();
                                       this.props.actions.loadAllOrders(parseInt(lastPage));
                                       this.props.dispatch(change('orders','selected_row',''))
                                     }}>
                            <Icon name='angle double right' />
                          </Menu.Item>
                        </Menu>
                      </Table.HeaderCell>
                    </Table.Row>
                  </Table.Footer>
                </Table>
              </Segment>
            </div>
          {/*</Segment.Group>*/}


        </div>


      )

    }
  //}
}

Orders3.propTypes = {
  orders: PropTypes.object.isRequired,
  // carriers: PropTypes.object.isRequired,
  // children: PropTypes.object,
  //selected_rows: PropTypes.array.isRequired
};


const selector = formValueSelector('orders')

Orders3 = reduxForm({
  form: 'orders', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  //validate
})(Orders3)

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({loadAllOrders, loadOrder, loadOrderPayments}, dispatch),
  dispatch: dispatch
});



export default connect(
  state => {

    let offset = 0;
    let total = 0;
    let limit = 0;
    let page = 0;
    let pages = 0;

    if(state.orders_stuff.orders !== undefined && state.orders_stuff.orders.data !== undefined && !isEmpty(state.orders_stuff.orders.data)) {
      page = state.orders_stuff.orders.data.page;
      pages = state.orders_stuff.orders.data.pages;
      total = state.orders_stuff.orders.data.total;
      limit = state.orders_stuff.orders.data.per_page;
      offset = (page - 1) * limit + 1
    }

    let search_field = selector(state, 'search_field')
    let selected_row = selector(state, 'selected_row')
    let selected_row2 = selector(state, 'selected_row2')
    let activeItem = selector(state, 'activeItem')

    if(search_field === undefined || search_field === ''){
      search_field = ''
    }

    if(selected_row === undefined || selected_row === ''){
      selected_row = ''
    }

    if(activeItem === undefined || activeItem === ''){
      activeItem = 'list'
    }


    return {
      orders: state.orders_stuff.orders,
      order_details: state.orders_stuff.order_details,
      order_payments: state.orders_stuff.order_payments,

      search_field: search_field,
      selected_row: selected_row,
      selected_row2: selected_row2,
      activeItem: activeItem,


      offset: offset,
      total: total,
      limit: limit,
      page: page,
      pages: pages,
    }}
  ,mapDispatchToProps)(Orders3);
