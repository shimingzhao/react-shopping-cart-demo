import React, {Component} from 'react'
import Modal from 'react-responsive-modal';
import {Button, Segment} from 'semantic-ui-react'
import ReactToPrint from "react-to-print";


export default class InvoicePopup extends React.Component {
  state = {
    open: false,
  };

  onOpenModal = () => {
    this.setState({open: true});
  };

  onCloseModal = () => {
    this.setState({open: false});
  };

  render() {
    const {order} = this.props
    let total_payment = 0
    console.log(order)
    const {open} = this.state;
    return (
      <div>
        <a className='popupTrigger'
           style={{color: 'LightSteelBlue', textDecoration: 'underline', cursor: 'pointer'}}
           onClick={this.onOpenModal}>{order.ORDERID}</a>
        <Modal open={open} onClose={this.onCloseModal} little>
          <div id='invoicePopupBody' ref={el => (this.componentRef = el)}>
            <h2 id='popupHeader'>Payment List</h2>
            <div>Order Id: {order.ORDERID}</div>
            <div className='invoicePopupCustomer'>
              <div className='popupInfo' style={{
                display: order.ORDERDETAILS[0].CUSTOMERSHIPTO.NAME1 ? '' : 'none',
                width: '50%'
              }}>
                {(order.ORDERDETAILS[0].CUSTOMERSHIPTO.NAME2 === undefined ? '' : order.ORDERDETAILS[0].CUSTOMERSHIPTO.NAME2 + ' ') + order.ORDERDETAILS[0].CUSTOMERSHIPTO.NAME1}<br/>
                {order.ORDERDETAILS[0].CUSTOMERSHIPTO.ADDRESS1 + ', ' +
                order.ORDERDETAILS[0].CUSTOMERSHIPTO.CITY + ', ' +
                order.ORDERDETAILS[0].CUSTOMERSHIPTO.COUNTRYID + ', ' +
                order.ORDERDETAILS[0].CUSTOMERSHIPTO.ZIPCODE}<br/>
                <span style={{display: order.ORDERDETAILS[0].CUSTOMERSHIPTO.AREACODE ? '' : 'none'}}>
                  Tel: ({order.ORDERDETAILS[0].CUSTOMERSHIPTO.AREACODE}){order.ORDERDETAILS[0].CUSTOMERSHIPTO.PRIMARYTEL}
                </span>
              </div>
              <div className='popupInfo' style={{flexGrow: '1'}}>
                <p>
                  {order.STOREINFO.STORENAME}<br/>
                  {
                    order.STOREINFO.STOREADDRESS1 + ', ' +
                    (order.STOREINFO.STOREADDRESS2 ? order.STOREINFO.STOREADDRESS2 + ', ' : '') +
                    order.STOREINFO.STORECITY + ', ' +
                    order.STOREINFO.STORESTATEPROV + ', ' +
                    order.STOREINFO.STORECOUNTRYID
                  }
                  <br/>
                  Tel: ({order.STOREINFO.STOREAREACODE}) {order.STOREINFO.STOREPRIMARYTEL}
                </p>
              </div>
            </div>
            {
              order.PAYMENTS.map((item, index) => {
                total_payment += item.AMOUNTPAID
                return (
                  <div className='invoicePopupItems' style={{display: 'flex', flexFlow: 'row'}} key={index}>
                    <div
                      className='invoicePopupPrice_style1'>{item.PAYMENTDATE !== null ? item.PAYMENTDATE.substring(0, 16) : ''}</div>
                    <div className='invoicePopupPrice_style1'>{item.DESC_1}</div>
                    <div className='invoicePopupPrice_style1'>{item.CREDCARD_NUM}</div>
                    <div className='invoicePopupPrice_style1'
                         style={{textAlign: 'right'}}>$ {item.AMOUNTPAID.toFixed(2)}</div>
                  </div>
                )
              })
            }
            <div className='invoicePopupMount'>
              <div className='invoicePopupMount_style1'>Total Payment:</div>
              <div className='invoicePopupMount_style2'>$ {total_payment.toFixed(2)}</div>
            </div>
            <div className='invoicePopupTxt'>
              You have made ${total_payment.toFixed(2)} with this transaction. It was a pleasure to meet you!
              For more information or for your FREE Business Analysis, contact us at<br/>
              1-800-820- 1412 or info@multidev.com Please, visit: www.multidev.com
            </div>
          </div>
          <div id='invoicePopupPrintButton'>
            <ReactToPrint
              trigger={() => <Button primary>Print</Button>}
              content={() => this.componentRef}
            />
          </div>
        </Modal>
      </div>
    );
  }
}
