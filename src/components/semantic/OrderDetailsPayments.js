import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import '../../stylesheets/main.scss'
import {loadOrderPayments} from '../../actions/ordersActions'

const loadOrderPaymentData = props => {
  console.log('loading payments data')
  props.actions.loadOrderPayments(1, 'D400000053')
}

class Payments extends Component {

  componentDidMount() {
    loadOrderPaymentData(this.props)
  }

  render() {
    const payments = this.props;
    console.log(payments)
    return (
      <div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({loadOrderPayments}, dispatch),
  dispatch: dispatch
});

const mapStateToProps = (state) => {
  return {
    order_payments: state.orders_stuff.order_payments,
  }
}

export default connect(
  mapStateToProps, mapDispatchToProps)(Payments);
