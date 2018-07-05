import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {Grid, Image, Popup, Segment, Menu, Icon, Dimmer, Loader} from 'semantic-ui-react'
import {loadAllOrders, loadOrderPayments, loadOrder, loadAllOrders2} from '../../actions/ordersActions'
import {change, formValueSelector, reduxForm} from "redux-form";
import {Values} from 'redux-form-website-template'

const loadAllOrdersData2 = props => {
  console.log('loading orders2 data')
  props.actions.loadAllOrders2(1)
}

const isEmpty = (obj) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}

class Orders2 extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log('--------------- orders2 componentDidMount --------------')
    // this.props.dispatch(change('orders', 'page', ''))

    loadAllOrdersData2(this.props)
    console.log(this.props)
  }

  render() {
    const {
      orders2,
      offset,
      total,
      limit,
      page
    } = this.props;
    console.log('~~~~~~~~~~ orders2 start ~~~~~~~~~')
    console.log(orders2)
    console.log('~~~~~~~~~~ orders2 end ~~~~~~~~~~')

    return (
      <div>
        <Dimmer active={orders2 && orders2.isFetching == true && true} inverted>
          <Loader active inverted content='Loading'/>
        </Dimmer>
        {(orders2.data !== undefined && !isEmpty(orders2.data.data)) ?
          orders2.data.data.map((row, index) => {
            return (
              <Segment raised>
                {/*index: {index} <br/>*/}
                {/*prev: {(index > 0) ? (index - 1) : 'undefined'} <br/>*/}
                {/*Previous Order#*/}
                {/*{*/}
                {/*(index > 0)*/}
                {/*?*/}
                {/*orders2.data.data[index - 1].orderid*/}
                {/*:*/}
                {/*''*/}
                {/*}*/}


                <Grid celled divided stretched>
                  <Grid.Row color='grey' key={index}>
                    <Grid.Column width={3}>Order Placed <br/> {row.orderdate.substring(0, 10)}
                    </Grid.Column>
                    <Grid.Column width={2}>Total <br/>$ {row.total.toFixed(2)}</Grid.Column>
                    <Grid.Column width={5}>Store <br/> store name</Grid.Column>
                    <Grid.Column width={6}>
                      <Grid columns={3}>
                        <Grid.Column width={5}>
                          Order# <br/> {row.orderid}
                        </Grid.Column>
                        <Grid.Column
                          width={5}
                          // style={{display: row.parentorderid === null ? 'none' : ''}}
                        >
                          Parent
                          order# <br/> {row.parentorderid === null ? row.orderid : row.parentorderid}
                        </Grid.Column>
                        <Grid.Column
                          width={6}
                          style={{display: row.CUSTPO === null ? 'none' : ''}}
                        >
                          Web transaction# <br/> {row.CUSTPO}
                          {/*<Grid textAlign='right' verticalAlign='bottom' style={{fontSize:'11px'}}> <a>Order Details</a> | <a>Invoice</a></Grid>*/}
                        </Grid.Column>
                        {/*<Grid.Column width={4} textAlign='right'  style={{fontSize:'13px'}}>*/}
                        {/*<a>Order Details</a> | <a>Invoice</a>*/}
                        {/*</Grid.Column>*/}
                      </Grid>
                      {/*<Grid columns={1}>*/}
                      {/*</Grid>*/}
                    </Grid.Column>
                  </Grid.Row>


                  {/*Delivery items*/}
                  <Grid
                    celled
                    style={{display: !isEmpty(row.ORDERDETAILS.filter(item => item.deliveryid === null)) || isEmpty(row.ORDERDETAILS) ? 'none' : ''}}
                  >
                    <Grid.Row style={{background: '#f3f3f3'}}>
                      <Grid.Column width={4}>
                        Delivered date: shipdate
                      </Grid.Column>
                      <Grid.Column width={4}>
                        Delivery id: deliveryid
                      </Grid.Column>
                      <Grid.Column width={8}>
                        Ship to:
                        <Popup
                          trigger={<a>name</a>}
                          content='Hide the popup on any scroll event'
                          on='click'
                          hideOnScroll
                          position='right center'
                        />
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column width={3} textAlign='center'>
                        <Popup
                          trigger={<Image src='https://react.semantic-ui.com/logo.png'
                                          size='tiny'/>}
                          content={<Image
                            src='https://images.idgesg.net/images/article/2017/06/reactjs_code_coding_thinkstock-100725807-large.jpg'
                            size='massive'/>}
                          on='click'
                          hideOnScroll
                          position='right center'
                        />
                      </Grid.Column>
                      <Grid.Column width={10}>
                        <Grid style={{height: '60px'}} padded>
                          aaa
                        </Grid>
                        <Grid style={{height: '10px'}} padded>
                          bbb
                        </Grid>
                      </Grid.Column>
                      <Grid.Column width={3}>
                        Area for future links
                      </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                      <Grid.Column width={3} textAlign='center'>
                        <Popup
                          trigger={<Image src='https://react.semantic-ui.com/logo.png'
                                          size='tiny'/>}
                          content={<Image
                            src='https://images.idgesg.net/images/article/2017/06/reactjs_code_coding_thinkstock-100725807-large.jpg'
                            size='massive'/>}
                          on='click'
                          hideOnScroll
                          position='right center'
                        />
                      </Grid.Column>
                      <Grid.Column width={10}>
                        <Grid style={{height: '60px'}} padded>
                          aaa
                        </Grid>
                        <Grid style={{height: '10px'}} padded>
                          bbb
                        </Grid>
                      </Grid.Column>
                      <Grid.Column width={3}>
                        Area for future links
                      </Grid.Column>
                    </Grid.Row>
                  </Grid>

                  {/*Picked up items at store order details*/}
                  <Grid
                    celled
                    style={{display: isEmpty(row.ORDERDETAILS) || !isEmpty(row.ORDERDETAILS.filter(item => item.deliveryid !== null)) ? 'none' : ''}}
                  >
                    <Grid.Row style={{background: '#f3f3f3'}}>
                      <Grid.Column width={8}>
                        Picked up at store date: pickupdate
                      </Grid.Column>
                      <Grid.Column width={8}>
                        Store:
                        <Popup
                          trigger={<a>storename</a>}
                          content='Hide the popup on any scroll event'
                          on='click'
                          hideOnScroll
                          position='right center'
                        />
                      </Grid.Column>
                    </Grid.Row>
                    {
                      row.ORDERDETAILS.map((item, index) => {
                        return (
                          <Grid.Row key={index}>
                            <Grid.Column width={3} textAlign='center'>
                              <Popup
                                hoverable
                                trigger={<div className='imageicon'><Image
                                  src='https://react.semantic-ui.com/logo.png'
                                  size='tiny'/></div>}
                                content={<Image
                                  src='https://images.idgesg.net/images/article/2017/06/reactjs_code_coding_thinkstock-100725807-large.jpg'
                                  size='huge'/>}
                                on='hover'
                                hideOnScroll
                                position='right center'
                              />
                            </Grid.Column>
                            <Grid.Column width={10}>
                              <Grid style={{height: '65px'}} padded>
                                Im_longdesc{item.Desc_1}
                              </Grid>
                              <Grid style={{height: '5px'}} padded>
                                qshipped * currid sellprice{item.productcode}
                              </Grid>
                            </Grid.Column>
                            <Grid.Column width={3}>
                              Area for future links
                            </Grid.Column>
                          </Grid.Row>
                        )
                      })
                    }
                  </Grid>
                </Grid>
              </Segment>


            )
          })
          :
          ''
        }
        {/*        <Grid celled divided stretched>
        Order summary
        <Grid.Row color='grey'>
          <Grid.Column width={3}>
            Order Placed <br/> order date
          </Grid.Column>
          <Grid.Column width={2}>
            Total <br/> total
          </Grid.Column>
          <Grid.Column width={5}>
            Store <br/> store name
          </Grid.Column>
          <Grid.Column width={6}>
            <Grid columns={3}>
              <Grid.Column width={5}>
                Order# <br/> Order#
              </Grid.Column>
              <Grid.Column
                width={5}
                // style={{display: row.parentorderid === null ? 'none' : ''}}
              >
                Parent order# <br/> Parent order#
              </Grid.Column>
              <Grid.Column
                width={6}
                // style={{display: row.CUSTPO === null ? 'none' : ''}}
              >
                Web transaction# <br/> Web transaction#
                <Grid textAlign='right' verticalAlign='bottom' style={{fontSize:'11px'}}> <a>Order Details</a> | <a>Invoice</a></Grid>
              </Grid.Column>
            </Grid>
            <Grid columns={1}>
              <Grid.Column width={16} textAlign='right' verticalAlign='bottom' style={{fontSize:'13px'}}> <a>Order Details</a> | <a>Invoice</a> </Grid.Column>
            </Grid>
          </Grid.Column>
        </Grid.Row>

        Layaway order details
        <Grid celled>
          <Grid.Row style={{background: '#f3f3f3'}}>
            <Grid.Column width={8}>
              Layaway
            </Grid.Column>
            <Grid.Column width={8}>
              Store:
              <Popup
                trigger={<a>storename</a>}
                content='Hide the popup on any scroll event'
                on='click'
                hideOnScroll
                position='right center'
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column width={3} textAlign='center'>
              <Popup
                trigger={<Image src='https://react.semantic-ui.com/logo.png' size='tiny'/>}
                content={<Image
                  src='https://images.idgesg.net/images/article/2017/06/reactjs_code_coding_thinkstock-100725807-large.jpg'
                  size='massive'/>}
                on='click'
                hideOnScroll
                position='right center'
              />
            </Grid.Column>
            <Grid.Column width={10}>
              <Grid style={{height: '60px'}} padded>
                aaa
              </Grid>
              <Grid style={{height: '10px'}} padded>
                bbb
              </Grid>
            </Grid.Column>
            <Grid.Column width={3} padded>
              Area for future links
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Grid>*/}

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
                       var firstPage = this.props.orders2.data.first.split('/').pop();
                       if (typeof firstPage === 'string') {
                         firstPage = 1;
                       }
                       this.props.dispatch(change('orders2', 'orders2', ''))
                       this.props.actions.loadAllOrders2(firstPage);

                     }}
          >
            <Icon name='angle double left'/>
          </Menu.Item>
          <Menu.Item as='a'
                     icon
                     disabled={offset === 1}
                     onClick={() => {
                       var prevPage = this.props.orders2.data.prev.split('/').pop();
                       if (typeof prevPage === 'string') {
                         prevPage = this.props.orders2.data.page - 1;
                       }
                       this.props.actions.loadAllOrders2(parseInt(prevPage));
                       this.props.dispatch(change('orders', 'orders2', ''))
                     }}
          >
            <Icon name='angle left'/>
          </Menu.Item>


          <Menu.Item as='a' icon
                     disabled={offset + limit >= total}
                     onClick={() => {
                       var nextPage = this.props.orders2.data.next.split('/').pop();
                       this.props.actions.loadAllOrders2(parseInt(nextPage));
                       this.props.dispatch(change('orders', 'selected_row', ''))
                     }}
          >
            <Icon name='angle right'/>
          </Menu.Item>
          <Menu.Item as='a'
                     icon
                     disabled={offset + limit >= total}
                     onClick={() => {
                       var lastPage = this.props.orders2.data.last.split('/').pop();
                       this.props.actions.loadAllOrders2(parseInt(lastPage));
                       this.props.dispatch(change('orders', 'selected_row', ''))
                     }}>
            <Icon name='angle double right'/>
          </Menu.Item>
        </Menu>

      </div>


    )
  }
}

Orders2.propTypes = {
  orders2: PropTypes.object.isRequired,
};

const selector = formValueSelector('orders')

Orders2 = reduxForm({
  form: 'orders', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  //validate
})(Orders2)

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({loadAllOrders, loadOrderPayments, loadOrder, loadAllOrders2}, dispatch),
  dispatch: dispatch
});


export default connect(
  state => {
    let offset = 0;
    let total = 0;
    let limit = 0;
    let page = 0;
    let pages = 0;

    //console.log(state.orders_stuf)
    //console.log(state.orders2_stuff)

    if (state.orders_stuff.orders2 !== undefined && state.orders_stuff.orders2.data !== undefined && !isEmpty(state.orders_stuff.orders2.data)) {
      page = state.orders_stuff.orders2.data.page;
      pages = state.orders_stuff.orders2.data.pages;
      total = state.orders_stuff.orders2.data.total;
      limit = state.orders_stuff.orders2.data.per_page;
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

      orders2: state.orders_stuff.orders2,
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
  , mapDispatchToProps)(Orders2);
