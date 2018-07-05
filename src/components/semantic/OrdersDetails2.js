import React, {Component} from 'react'
import {Grid, Image, Popup, Segment, Icon, Header} from 'semantic-ui-react'
import InvoicePopup from './InvoicePopup'
import ReturnOriginalInvoicePopup from './ReturnOriginalInvoicePopup'
import 'semantic-ui-css/semantic.min.css'

const isEmpty = (obj) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}

class OrdersDetails2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  componentWillUpdate(nextProps){
    // if ((this.props.found_order === undefined || this.props.found_order === nextProps.found_order) && this.state.visible !== nextProps.allVisible){
    //   this.setState({visible: nextProps.allVisible})
    // }
    // if (nextProps.page !== this.props.page) {
    //   this.setState({visible: false})
    // }
  }

  toggleVisibility = () => this.setState({visible: !this.state.visible})

  render() {
    const {row, findOrder, found_order} = this.props;
    // console.log('~~~~~~~~~~ order details start ~~~~~~~~~')
    // console.log(row)
    // console.log('~~~~~~~~~~ order details end ~~~~~~~~~')

    return (
      <div>I AM OrderDetails 2</div>
    )
  }
}

export default OrdersDetails2;