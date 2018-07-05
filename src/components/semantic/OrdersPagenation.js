import React, {Component} from 'react'
import {Grid, Image, Popup, Segment, Menu, Icon, Dimmer, Loader} from 'semantic-ui-react'
import {change, formValueSelector, reduxForm, Field} from "redux-form";

const OrdersPagenation = (props) => {
  const {orders, offset, total, limit, page} = props;
  console.log(orders)
  console.log(total)
  console.log(page)
  console.log(limit)
  console.log(offset)
  return(
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
                 }}>
        <Icon name='angle double right'/>
      </Menu.Item>
    </Menu>
  )
}

export default OrdersPagenation;