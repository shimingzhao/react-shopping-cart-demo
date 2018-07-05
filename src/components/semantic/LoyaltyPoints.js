import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import '../../stylesheets/main.scss'
import 'semantic-ui-css/semantic.min.css'
import {
  Grid,
  Image,
  Popup,
  Segment,
  Menu,
  Icon,
  Header,
  Card,
  Dimmer,
  Loader
} from 'semantic-ui-react'
import {loadLoyaltyPoints} from '../../actions/ordersActions'
import {change} from "redux-form";
import PropTypes from "prop-types";

const isEmpty = (obj) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}

const loadLoyaltyPointsData = props => {
  console.log('loading LoyaltyPoints data')
  props.actions.loadLoyaltyPoints()
}

class Points extends Component {

  componentDidMount() {
    loadLoyaltyPointsData(this.props)
  }

  render() {
    const {
      loyalty_points,
      offset,
      total,
      limit,
      page
    } = this.props;
    console.log(loyalty_points.data.ACTIVEPOINTS)
    return (
      <div>
        <Dimmer active={loyalty_points && loyalty_points.isFetching == true && true} inverted>
          <Loader active inverted content='Loading'/>
        </Dimmer>
        <div style={{display: 'flex', flexFlow: 'row', justifyContent: 'space-between'}}>
          <div className='cards_style'>
            <Card>
              <Card.Content style={{background: '#f3f3f3', fontcolor: 'grey'}}
                            description='Active Points'/>
              <Card.Content style={{fontSize: '1.5rem', textAlign: 'right'}}
                            description={loyalty_points.isFetching == true || loyalty_points.data.ACTIVEPOINTS == '' || loyalty_points.data.ACTIVEPOINTS == null ? 0 : loyalty_points.data.ACTIVEPOINTS}/>
            </Card>
          </div>
          <div className='cards_style'>
            <Card>
              <Card.Content style={{background: '#f3f3f3', fontcolor: 'grey'}}
                            description='Pending Points'/>
              <Card.Content style={{fontSize: '1.5rem', textAlign: 'right'}}
                            description={loyalty_points.data.PENDINGPOINTS ? loyalty_points.data.PENDINGPOINTS : 0}/>
            </Card>
          </div>
          <div className='cards_style'>
            <Card>
              <Card.Content style={{background: '#f3f3f3', fontcolor: 'grey'}}
                            description='Total Points'/>
              <Card.Content style={{fontSize: '1.5rem', textAlign: 'right'}}
                            description={
                              (loyalty_points.isFetching == true || loyalty_points.data.ACTIVEPOINTS == '' || loyalty_points.data.ACTIVEPOINTS == null ? 0 : loyalty_points.data.ACTIVEPOINTS)
                              +
                              (isEmpty(loyalty_points.data.PENDINGPOINTS) || loyalty_points.isFetching == true ? 0 : loyalty_points.data.PENDINGPOINTS)
                            }
              />
            </Card>
          </div>
          <div className='cards_style'>
            <Card>
              <Card.Content style={{background: '#f3f3f3', fontcolor: 'grey'}}
                            description='Total Items'/>
              <Card.Content style={{fontSize: '1.5rem', textAlign: 'right'}}
                            description={loyalty_points.data.total ? loyalty_points.data.total : 0}/>
            </Card>
          </div>
        </div>
        <Segment className='ordersdetails' raised tertiary size='small'
                 style={{
                   padding: '0.050rem',
                   border: '0.050rem',
                   display: !isEmpty(loyalty_points.data.data) ? '' : 'none'
                 }}>
          <div>
            <div className='loyaltyPoints_style'
              // style={{display:'flex', flexFlow:'row', height:'50px', alignItems:'center', textAlign:'center', background:'grey', font:'white'}}
            >
              <div style={{width: '10%'}}>Ship Date</div>
              <div style={{width: '10%'}}>Order Id</div>
              <div style={{width: '13%'}}>Product Code</div>
              <div style={{width: '28%'}}>Description</div>
              <div style={{width: '5%'}}>Quantity</div>
              <div style={{width: '8%', textAlign: 'right'}}>Sell Price</div>
              <div style={{width: '8%', textAlign: 'right'}}>Total Price</div>
              <div style={{width: '10%', textAlign: 'right'}}>Loyalty Points</div>
              <div style={{width: '8%'}}>Status</div>
            </div>
            {
              loyalty_points.data.data ?
                loyalty_points.data.data.map((item, index) => {
                    return (
                      <div key={index} style={{
                        display: 'flex',
                        flexFlow: 'row',
                        height: '50px',
                        alignItems: 'center',
                        background: index % 2 == 0 ? 'white' : '#f3f3f3',
                      }}>
                        <div style={{
                          width: '10%',
                          textAlign: 'center',
                          marginLeft: '0.5rem'
                        }}>{item.SHIPDATE.substring(6, 16)}</div>
                        <div style={{width: '10%', textAlign: 'center', marginLeft: '0.8rem'}}>{item.ORDERID}</div>
                        <div style={{width: '13%', marginLeft: '0.8rem'}}>{item.PRODUCTCODE}</div>
                        <div style={{width: '28%', marginLeft: '0.8rem'}}>{item.DESC_1}</div>
                        <div style={{width: '5%', textAlign: 'center'}}>{item.QSHIPPED}</div>
                        <div style={{width: '8%', textAlign: 'right'}}>{item.SELLPRICE.toFixed(2)}</div>
                        <div style={{width: '8%', textAlign: 'right'}}>{item.LINETOT.toFixed(2)}</div>
                        <div style={{width: '10%', textAlign: 'right'}}>{item.LOYALTYPOINTS}</div>
                        <div style={{
                          width: '8%',
                          textAlign: 'center'
                        }}>{((Date.now() - Date.parse(item.SHIPDATE)) / (24 * 60 * 60 * 1000) >= 30) ? 'Active' : 'Pending'}</div>
                      </div>
                    )
                  }
                )
                :
                ''
            }
          </div>
        </Segment>


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
                       let firstPage = this.props.loyalty_points.data.first.split('/').pop();
                       if (typeof firstPage === 'string') {
                         firstPage = 1;
                       }
                       this.props.actions.loadLoyaltyPoints(firstPage);
                       // this.allOrdersDetailsVisibleReset()
                     }}
          >
            <Icon name='angle double left'/>
          </Menu.Item>
          <Menu.Item as='a'
                     icon
                     disabled={offset === 1}
                     onClick={() => {
                       let prevPage = this.props.loyalty_points.data.prev.split('/').pop();
                       if (typeof prevPage === 'string') {
                         prevPage = this.props.loyalty_points.data.page - 1;
                       }
                       this.props.actions.loadLoyaltyPoints(parseInt(prevPage));
                       // this.props.dispatch(change('orders', 'orders', ''))
                       // this.allOrdersDetailsVisibleReset()
                     }}
          >
            <Icon name='angle left'/>
          </Menu.Item>
          <Menu.Item as='a' icon
                     disabled={offset + limit >= total}
                     onClick={() => {
                       let nextPage = this.props.loyalty_points.data.next.split('/').pop();
                       this.props.actions.loadLoyaltyPoints(parseInt(nextPage));
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
                       let lastPage = this.props.loyalty_points.data.last.split('/').pop();
                       this.props.actions.loadLoyaltyPoints(parseInt(lastPage));
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

Points.propTypes = {
  loyalty_points: PropTypes.object.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({loadLoyaltyPoints}, dispatch),
  dispatch: dispatch
});

const mapStateToProps = (state) => {
  let offset = 0;
  let total = 0;
  let limit = 0;
  let page = 0;
  let pages = 0;

  if (state.orders_stuff.loyalty_points !== undefined && state.orders_stuff.loyalty_points.data !== undefined && !isEmpty(state.orders_stuff.loyalty_points.data)) {
    page = state.orders_stuff.loyalty_points.data.page;
    pages = state.orders_stuff.loyalty_points.data.pages;
    total = state.orders_stuff.loyalty_points.data.total;
    limit = state.orders_stuff.loyalty_points.data.per_page;
    offset = (page - 1) * limit + 1
  }
  return {
    loyalty_points: state.orders_stuff.loyalty_points,
    offset: offset,
    total: total,
    limit: limit,
    page: page,
    pages: pages,
  }
}


export default connect(
  mapStateToProps, mapDispatchToProps)(Points);
