import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {
  Grid,
  Image,
  Popup,
  Segment,
  Menu,
  Icon,
  Dimmer,
  Loader,
  Button,
  Search,
  Header,
  Input,
  Dropdown,
  Select
} from 'semantic-ui-react'
import {loadAllOrders, findOrder} from '../../actions/ordersActions'
import {change, formValueSelector, reduxForm, Field} from "redux-form";
import {Values} from 'redux-form-website-template'
import OrdersDetails from './OrdersDetails'

const loadAllOrdersData = props => {
  //console.log('loading orders data')
  props.actions.loadAllOrders(1)
}

const renderField = (field) => (
  <div>
    <Input icon='search' iconPosition='left' className='prompt' type='text' {...field.input} placeholder='Search...'/>
  </div>
)

const isEmpty = (obj) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {allVisible: false};
  }

  componentDidMount() {
    console.log('--------------- orders componentDidMount --------------')
    // this.props.dispatch(change('orders', 'page', ''))

    loadAllOrdersData(this.props)
    console.log(this.props)
    console.log('--------------- orders componentDidMount DONE --------------')
  }

  toggleVisibility_true = () => {
    this.setState({allVisible: true})
  }
  toggleVisibility_false = () => {
    this.setState({allVisible: false})
  }

  handleRef = (c) => {
    this.inputRef = c
  }

  search = (category) => {
    this.props.actions.loadAllOrders(1, category, this.inputRef.inputRef.value)
  }


  render() {
    const {
      found_order,
      orders,
      offset,
      total,
      limit,
      page,
      search_field
    } = this.props;
    console.log('~~~~~~~~~~ found orders start ~~~~~~~~~')
    console.log(found_order)
    //console.log(page)
    console.log('~~~~~~~~~~ found orders end ~~~~~~~~~~')

    const options = [
      {key: 'order', text: 'Search Order', value: 'orderid'},
      {key: 'invoice', text: 'Search Invoice', value: 'invoice'},
      {key: 'orders', text: 'All Orders', value: 'orders'},
    ]

    const InputExampleActionDropdown = () => (
      <Input
        ref={this.handleRef}
        action={
          <Dropdown button floating options={options}
                    onChange={(e, value) => {
                      // if (this.inputRef.inputRef.value !== undefined && this.inputRef.inputRef.value != '') {
                        this.search(value.value)
                      // }
                      // else console.log(this.inputRef.inputRef.value)
                    }} defaultValue='orderid'/>}
        icon='search'
        iconPosition='left'
        placeholder='Search...'
        size='small'
        type='text'
        onChange={(e, value) => {
          if (value !== undefined && value != '') {
          }
          else {
            this.props.actions.loadAllOrders(1)
          }
        }}
      />
    )
    return (
      <div>
        <Dimmer active={orders && orders.isFetching == true && true} inverted>
          <Loader active inverted content='Loading'/>
        </Dimmer>
        <div className='ui right aligned category search item'
             style={{display: 'flex', flexFlow: 'row', justifyContent: 'space-between'}}>
          <div>
            <Button size='small' style={{width: '10rem'}} content={'Expand all'} onClick={this.toggleVisibility_true}/>
            <Button size='small' style={{width: '10rem'}} content={'Concentrate all'}
                    onClick={this.toggleVisibility_false}/>
          </div>

          {/*          <div  className='ui transparent icon input'>
            <Field
              name="search_field"
              component={renderField}
              onChange={(e, value) => {
                if (value !== undefined && value != '') {
                }
                else {
                  this.props.actions.loadAllOrders(1)
                }
              }}
              type="text"
            />
            <Dropdown  button basic  floating options={options} defaultValue='order'
                      onChange={() => {
                        if (search_field !== undefined && search_field != '') {
                          this.props.actions.loadAllOrders(1, search_field)
                        }
                        console.log('options.value')
                        console.log(this.props.options.value)
                        //this.props.actions.loadShipmentsPaged(1, 'shipment_identification', search_field)
                      }}
            />
          </div>*/}
          <div><InputExampleActionDropdown/></div>

          {/*<div className='results'/>*/}
        </div>

        {(orders.data !== undefined && !isEmpty(orders.data.data)) ?
          orders.data.data.map((row, index) => {
            return (
              <OrdersDetails
                row={row}
                page={page}
                key={index}
                findOrder={this.props.actions.findOrder}
                found_order={found_order}
                allVisible={this.state.allVisible}
              />
              /*              <Segment raised>
                              <Grid celled divided stretched>
                                <Grid.Row color='grey' key={row.ORDERID}>
                                  <Grid.Column width={3}>Order Placed <br/> {row.ORDERDATE.substring(0, 10)}</Grid.Column>
                                  <Grid.Column width={2}>Total <br/>$ {row.TOTAL.toFixed(2)}</Grid.Column>
                                  <Grid.Column width={5}>Store <br/> {row.ORDERDETAILS[0] ? row.ORDERDETAILS[0].STORENAME : 'N/A'}
                                  </Grid.Column>
                                  <Grid.Column width={6}>
                                    <Grid columns={3}>
                                      <Grid.Column width={5}>
                                        Order# <br/> {row.ORDERID}
                                      </Grid.Column>
                                      <Grid.Column
                                        width={5}
                                        // style={{display: row.parentorderid === null ? 'none' : ''}}
                                      >
                                        Parent order# <br/> {row.PARENTORDERID === null ? row.ORDERID : row.PARENTORDERID}
                                      </Grid.Column>
                                      <Grid.Column
                                        width={6}
                                        style={{display: row.CUSTPO === null ? 'none' : ''}}
                                      >
                                        Web transaction# <br/> {row.CUSTPO}
                                      </Grid.Column>
                                    </Grid>
                                  </Grid.Column>
                                </Grid.Row>

                                {/!*Delivery items*!/}
                                {
                                  isEmpty(row.ORDERDETAILS.filter(item => !isEmpty(item.DELIVERY))) || isEmpty(row.ORDERDETAILS) ?
                                    ''
                                    :
                                    <div style={{width: '100%'}}>
                                      {
                                        (row.ORDERDETAILS.map((item, index) => {
                                            return (
                                              !isEmpty(item.DELIVERY) ?
                                                <Grid celled>
                                                  <Grid.Row key={index} style={{
                                                    background: '#f3f3f3',
                                                    display: index === 0 || item.DELIVERY.INVDELID !== row.ORDERDETAILS[index - 1].DELIVERY.INVDELID ? '' : 'none'
                                                  }}>
                                                    <Grid.Column width={4}>
                                                      Delivered
                                                      date: {item.DELIVERY.DELIVERYDATE ? item.DELIVERY.DELIVERYDATE.substring(0, 10) : 'N/A'}
                                                    </Grid.Column>
                                                    <Grid.Column width={4}>
                                                      Delivery id: {item.DELIVERY.INVDELID}
                                                    </Grid.Column>
                                                    <Grid.Column width={8}>
                                                      Ship to: &nbsp;
                                                      <Popup
                                                        trigger={<a>{item.CUSTOMERSHIPTO.NAME1 ?
                                                          item.CUSTOMERSHIPTO.NAME1 + ', ' + item.CUSTOMERSHIPTO.ADDRESS1
                                                          :
                                                          'N/A'
                                                        }</a>}
                                                        content={item.CUSTOMERSHIPTO.NAME1 ?
                                                          item.CUSTOMERSHIPTO.ADDRESS1 + ', ' + item.CUSTOMERSHIPTO.CITY + ', ' + item.CUSTOMERSHIPTO.COUNTRYID + ', ' + item.CUSTOMERSHIPTO.ZIPCODE
                                                          :
                                                          'N/A'
                                                        }
                                                        on='hover'
                                                        hideOnScroll
                                                        position='right center'
                                                      />
                                                    </Grid.Column>
                                                  </Grid.Row>
                                                  {
                                                    item.COORDINATEGRP !== 'NA' ?
                                                      <Grid.Row stretched>
                                                        <Grid.Column width={3} textAlign='center'>
                                                          <Popup
                                                            hoverable
                                                            trigger={<div className='imageicon'><Image
                                                              src='https://gloimg.gbtcdn.com/gb/pdm-provider-img/straight-product-img/20171108/T011046/T0110460013/goods-img/1510083062035740824.jpg'
                                                              size='tiny'/></div>}
                                                            content={<Image
                                                              src='https://gloimg.gbtcdn.com/gb/pdm-provider-img/straight-product-img/20171108/T011046/T0110460013/goods-img/1510083062035740824.jpg'
                                                              size='huge'/>}
                                                            on='hover'
                                                            hideOnScroll
                                                            position='right center'
                                                          />
                                                        </Grid.Column>
                                                        <Grid.Column width={10}>
                                                          <Grid style={{height: '80px'}} padded>
                                                            {item.DESC_1} <br/>
                                                            {item.SKUID} - {item.PRODUCTCODE} <br/>
                                                          </Grid>
                                                          <Grid style={{height: '5px'}} padded>
                                                            Quantity Shipping: {item.DELIVERY.ITEMS} &nbsp;&nbsp;
                                                            Currency Id: {row.CURRID} &nbsp;&nbsp;
                                                            Sell pirce: ${item.SELLPRICE.toFixed(2)}
                                                          </Grid>
                                                        </Grid.Column>
                                                        <Grid.Column width={3}>
                                                          Invoice# : {item.INVOICE}
                                                        </Grid.Column>
                                                      </Grid.Row>
                                                      :
                                                      <Grid.Row stretched>
                                                        <Grid.Column width={3} textAlign='center'>
                                                          <div className='imageicon'>
                                                            <Image src='https://www.zetes.com/sites/default/files/inline-images/icon-delivery.png' size='tiny' />
                                                          </div>
                                                        </Grid.Column>
                                                        <Grid.Column width={10}>
                                                          <Grid style={{height: '80px'}} padded>
                                                            {item.DESC_1} &nbsp;&nbsp; {item.SKUID} - {item.PRODUCTCODE} <br/>
                                                            Shipping information: &nbsp;
                                                            {
                                                              item.CUSTOMERSHIPTO.NAME1 + ', ' +
                                                              item.CUSTOMERSHIPTO.ADDRESS1 + ', ' +
                                                              item.CUSTOMERSHIPTO.CITY + ', ' +
                                                              item.CUSTOMERSHIPTO.COUNTRYID + ', ' +
                                                              item.CUSTOMERSHIPTO.ZIPCODE
                                                            }
                                                          </Grid>
                                                          <Grid style={{height: '5px'}} padded>
                                                            {/!*Currency Id: {row.CURRID} &nbsp;&nbsp;*!/}
                                                            Shipping Charge: ${item.SELLPRICE.toFixed(2)}
                                                          </Grid>
                                                        </Grid.Column>
                                                        <Grid.Column width={3}>
                                                          Invoice# : {item.INVOICE}
                                                        </Grid.Column>
                                                      </Grid.Row>
                                                  }

                                                </Grid>

                                                :
                                                item.SPECIALLINETYPE !== 'L' && item.QRESERVED === 0 ?
                                                  //Picked up items at store order details
                                                  <Grid celled>
                                                    <Grid.Row key={index} style={{
                                                      background: '#f3f3f3',
                                                      // display: index === 0 || !isEmpty(row.ORDERDETAILS[index - 1].DELIVERY) || item.STORENAME !== row.ORDERDETAILS[index - 1].STORENAME ? '' : 'none'
                                                      display: index === 0 || !isEmpty(row.ORDERDETAILS[index - 1].DELIVERY) ? '' : 'none'
                                                    }}>
                                                      <Grid.Column width={8}>
                                                        Picked up at store date:
                                                      </Grid.Column>
                                                      <Grid.Column width={8}>
                                                        Store: &nbsp;
                                                        <Popup
                                                          trigger={<a>{item.STORENAME}</a>}
                                                          content={item.STORENAME}
                                                          on='hover'
                                                          hideOnScroll
                                                          position='right center'
                                                        />
                                                      </Grid.Column>
                                                    </Grid.Row>
                                                    <Grid.Row stretched>
                                                      <Grid.Column width={3} textAlign='center'>
                                                        <Popup
                                                          hoverable
                                                          trigger={<div className='imageicon'><Image
                                                            src='https://gloimg.gbtcdn.com/gb/pdm-provider-img/straight-product-img/20171108/T011046/T0110460013/goods-img/1510083062035740824.jpg'
                                                            size='tiny'/></div>}
                                                          content={<Image
                                                            src='https://gloimg.gbtcdn.com/gb/pdm-provider-img/straight-product-img/20171108/T011046/T0110460013/goods-img/1510083062035740824.jpg'
                                                            size='huge'/>}
                                                          on='hover'
                                                          hideOnScroll
                                                          position='right center'
                                                        />
                                                      </Grid.Column>
                                                      <Grid.Column width={10}>
                                                        <Grid style={{height: '80px'}} padded>
                                                          {item.DESC_1} <br/>
                                                          {item.SKUID} - {item.PRODUCTCODE} <br/>
                                                        </Grid>
                                                        <Grid style={{height: '5px'}} padded>
                                                          Quantity: {item.QORDERED} &nbsp; &nbsp;
                                                          Currency Id: {row.CURRID} &nbsp; &nbsp;
                                                          Sell pirce: ${item.SELLPRICE.toFixed(2)}
                                                        </Grid>
                                                      </Grid.Column>
                                                      <Grid.Column width={3}>
                                                        Invoice# : {item.INVOICE}
                                                      </Grid.Column>
                                                    </Grid.Row>
                                                  </Grid>
                                                  :
                                                  //Layaway items
                                                  <Grid celled>
                                                    <Grid.Row style={{background: '#f3f3f3'}}>
                                                      <Grid.Column width={8}>
                                                        Layaway
                                                      </Grid.Column>
                                                      <Grid.Column width={8}>
                                                        Store:&nbsp;
                                                        <Popup
                                                          trigger={<a>{item.STORENAME}</a>}
                                                          content={item.STORENAME}
                                                          on='hover'
                                                          hideOnScroll
                                                          position='right center'
                                                        />
                                                      </Grid.Column>
                                                    </Grid.Row>
                                                    <Grid.Row stretched>
                                                      <Grid.Column width={3} textAlign='center'>
                                                        <div className='imageicon'>
                                                          <Image src='https://imageog.flaticon.com/icons/png/512/47/47687.png' size='tiny' />
                                                        </div>
                                                      </Grid.Column>
                                                      <Grid.Column width={10}>
                                                        <Grid style={{height: '10px'}} padded>
                                                          {item.DESC_1} <br/>
                                                          {item.SKUID} - {item.PRODUCTCODE} <br/>

                                                        </Grid>
                                                        <Grid style={{height: '5px'}} padded>
                                                          Quantity: {item.QORDERED} &nbsp; &nbsp;
                                                          Currency Id: {row.CURRID} &nbsp; &nbsp;
                                                          Sell pirce: ${item.SELLPRICE.toFixed(2)}
                                                        </Grid>
                                                      </Grid.Column>
                                                      <Grid.Column width={3}>
                                                        Invoice# : {item.INVOICE}
                                                      </Grid.Column>
                                                    </Grid.Row>
                                                  </Grid>
                                            )
                                          }
                                        ))
                                      }
                                    </div>
                                }

                                {/!*Picked up items at store order details*!/}
                                {
                                  !isEmpty(row.ORDERDETAILS.filter(item => !isEmpty(item.DELIVERY))) || isEmpty(row.ORDERDETAILS) ?
                                    ''
                                    :
                                    <div style={{width: '100%'}}>
                                      {
                                        (row.ORDERDETAILS.map((item, index) => {
                                            return (
                                              item.SPECIALLINETYPE !== 'L' && item.QRESERVED === 0 ?
                                                <Grid celled>
                                                  <Grid.Row key={index} style={{
                                                    background: '#f3f3f3',
                                                    // display: index === 0 || item.STORENAME !== row.ORDERDETAILS[index - 1].STORENAME ? '' : 'none'
                                                    display: index === 0 ? '' : 'none'
                                                  }}>
                                                    <Grid.Column width={8}>
                                                      Picked up at store date:
                                                    </Grid.Column>
                                                    <Grid.Column width={8}>
                                                      Store: &nbsp;
                                                      <Popup
                                                        trigger={<a>{item.STORENAME}</a>}
                                                        content={item.STORENAME}
                                                        on='hover'
                                                        hideOnScroll
                                                        position='right center'
                                                      />
                                                    </Grid.Column>
                                                  </Grid.Row>
                                                  <Grid.Row stretched>
                                                    <Grid.Column width={3} textAlign='center'>
                                                      <Popup
                                                        hoverable
                                                        trigger={<div className='imageicon'><Image
                                                          src='https://gloimg.gbtcdn.com/gb/pdm-provider-img/straight-product-img/20171108/T011046/T0110460013/goods-img/1510083062035740824.jpg'
                                                          size='tiny'/></div>}
                                                        content={<Image
                                                          src='https://gloimg.gbtcdn.com/gb/pdm-provider-img/straight-product-img/20171108/T011046/T0110460013/goods-img/1510083062035740824.jpg'
                                                          size='huge'/>}
                                                        on='hover'
                                                        hideOnScroll
                                                        position='right center'
                                                      />
                                                    </Grid.Column>
                                                    <Grid.Column width={10}>
                                                      <Grid style={{height: '80px'}} padded>
                                                        {item.DESC_1} <br/>
                                                        {item.SKUID} - {item.PRODUCTCODE} <br/>

                                                      </Grid>
                                                      <Grid style={{height: '5px'}} padded>
                                                        Quantity: {item.QORDERED} &nbsp; &nbsp;
                                                        Currency Id: {row.CURRID} &nbsp; &nbsp;
                                                        Sell pirce: ${item.SELLPRICE.toFixed(2)}
                                                      </Grid>
                                                    </Grid.Column>
                                                    <Grid.Column width={3}>
                                                      Invoice# : {item.INVOICE}
                                                    </Grid.Column>
                                                  </Grid.Row>
                                                </Grid>
                                                :
                                                //Layaway items
                                                <Grid celled>
                                                  <Grid.Row style={{background: '#f3f3f3'}}>
                                                    <Grid.Column width={8}>
                                                      Layaway
                                                    </Grid.Column>
                                                    <Grid.Column width={8}>
                                                      Store:&nbsp;
                                                      <Popup
                                                        trigger={<a>{item.STORENAME}</a>}
                                                        content={item.STORENAME}
                                                        on='hover'
                                                        hideOnScroll
                                                        position='right center'
                                                      />
                                                    </Grid.Column>
                                                  </Grid.Row>
                                                  <Grid.Row stretched>
                                                    <Grid.Column width={3} textAlign='center'>
                                                      <div className='imageicon'>
                                                        <Image src='https://imageog.flaticon.com/icons/png/512/47/47687.png' size='tiny' />
                                                      </div>
                                                    </Grid.Column>
                                                    <Grid.Column width={10}>
                                                      <Grid style={{height: '80px'}} padded>
                                                        {item.DESC_1} <br/>
                                                        {item.SKUID} - {item.PRODUCTCODE} <br/>
                                                      </Grid>
                                                      <Grid style={{height: '5px'}} padded>
                                                        Quantity: {item.QORDERED} &nbsp; &nbsp;
                                                        Currency Id: {row.CURRID} &nbsp; &nbsp;
                                                        Sell pirce: ${item.SELLPRICE.toFixed(2)}
                                                      </Grid>
                                                    </Grid.Column>
                                                    <Grid.Column width={3}>
                                                      Invoice# : {item.INVOICE}
                                                    </Grid.Column>
                                                  </Grid.Row>
                                                </Grid>
                                            )
                                          }
                                        ))
                                      }
                                    </div>
                                }
                              </Grid>
                            </Segment>*/
            )
          })
          :
          ''
        }

        {/*Pagination*/}
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
                       let firstPage = this.props.orders.data.first.split('/').pop();
                       if (typeof firstPage === 'string') {
                         firstPage = 1;
                       }
                       this.props.dispatch(change('orders', 'orders', ''))
                       this.props.actions.loadAllOrders(firstPage);
                       // this.allOrdersDetailsVisibleReset()
                     }}
          >
            <Icon name='angle double left'/>
          </Menu.Item>
          <Menu.Item as='a'
                     icon
                     disabled={offset === 1}
                     onClick={() => {
                       let prevPage = this.props.orders.data.prev.split('/').pop();
                       if (typeof prevPage === 'string') {
                         prevPage = this.props.orders.data.page - 1;
                       }
                       this.props.actions.loadAllOrders(parseInt(prevPage));
                       // this.props.dispatch(change('orders', 'orders', ''))
                       // this.allOrdersDetailsVisibleReset()
                     }}
          >
            <Icon name='angle left'/>
          </Menu.Item>
          <Menu.Item as='a' icon
                     disabled={offset + limit >= total}
                     onClick={() => {
                       let nextPage = this.props.orders.data.next.split('/').pop();
                       this.props.actions.loadAllOrders(parseInt(nextPage));
                       // this.props.dispatch(change('orders', 'selected_row', ''))
                       // this.allOrdersDetailsVisibleReset()
                     }}
          >
            <Icon name='angle right'/>
          </Menu.Item>
          <Menu.Item as='a'
                     icon
                     disabled={offset + limit >= total}
                     onClick={() => {
                       let lastPage = this.props.orders.data.last.split('/').pop();
                       this.props.actions.loadAllOrders(parseInt(lastPage));
                       // this.props.dispatch(change('orders', 'selected_row', ''))
                       // this.allOrdersDetailsVisibleReset()
                     }}>
            <Icon name='angle double right'/>
          </Menu.Item>
        </Menu>

      </div>

    )
  }
}

Orders.propTypes = {
  orders: PropTypes.object.isRequired,
};

const selector = formValueSelector('orders')

Orders = reduxForm({
  form: 'orders', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  //validate
})(Orders)

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({loadAllOrders, findOrder}, dispatch),
  dispatch: dispatch
});

const mapStateToProps = (state) => {
  let offset = 0;
  let total = 0;
  let limit = 0;
  let page = 0;
  let pages = 0;

  //console.log(state.orders_stuff)
  // console.log(state.orders2_stuff)

  if (state.orders_stuff.orders !== undefined && state.orders_stuff.orders.data !== undefined && !isEmpty(state.orders_stuff.orders.data)) {
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

  if (search_field === undefined || search_field === '') {
    search_field = ''
  }

  if (selected_row === undefined || selected_row === '') {
    selected_row = ''
  }

  if (activeItem === undefined || activeItem === '') {
    activeItem = 'list'
  }


  return {

    found_order: state.orders_stuff.find_order,
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
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps)(Orders);
