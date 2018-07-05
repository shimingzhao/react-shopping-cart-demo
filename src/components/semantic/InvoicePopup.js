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
    let point = 0
    console.log(order)
    const {open} = this.state;
    return (
      <div>
        <a className='popupTrigger'
           style={{color: 'LightSteelBlue', textDecoration: 'underline', cursor: 'pointer'}}
           onClick={this.onOpenModal}>{order.INVOICE}</a>
        <Modal open={open} onClose={this.onCloseModal} little>
          <div>
            <div id='invoicePopupBody' ref={el => (this.componentRef = el)}>
              <h2 id='popupHeader'>Invoice Number - {order.INVOICE}</h2>
              <div>Thanks for your purchase.</div>
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
              <div className='popupInfo'>
                <p>Purchased data: {order.ORDERDATE.substring(0, 16)}</p>
              </div>

              {
                order.ORDERDETAILS.map((item, index) => {
                  point += item.LOYALTYPOINTS
                  return (
                    <div className='invoicePopupItems' key={index}>
                      <div className='invoicePopupShipto'>
                        <div>{item.DESC_1 !== null ? item.DESC_1.toUpperCase() : ''}</div>
                        <div
                          style={{display: item.CUSTOMERSHIPTO && item.CUSTOMERSHIPTO.NAME1 && item.COORDINATEGRP !== 'NA' ? '' : 'none'}}>
                          SHIP TO: &nbsp;&nbsp;
                          {
                            item.CUSTOMERSHIPTO ?
                              ((item.CUSTOMERSHIPTO.NAME2 === undefined ? '' : item.CUSTOMERSHIPTO.NAME2 + ' ') +
                                item.CUSTOMERSHIPTO.NAME1 + ', ' +
                                item.CUSTOMERSHIPTO.ADDRESS1 + ', ' +
                                item.CUSTOMERSHIPTO.CITY + ', ' +
                                item.CUSTOMERSHIPTO.COUNTRYID + ', ' +
                                item.CUSTOMERSHIPTO.ZIPCODE)
                              :
                              ''
                          }
                        </div>
                      </div>
                      <div>
                        {item.SKUID} - {item.PRODUCTCODE} ({item.LOYALTYPOINTS}points)
                      </div>
                      <div className='invoicePopupPrice'>
                        <div className='invoicePopupPrice_style1'>{item.QORDERED}x</div>
                        <div className='invoicePopupPrice_style1'>{item.PKPRICE.toFixed(2)}</div>
                        <div
                          className='invoicePopupPrice_style1'>{item.PKPRICE === item.SELLPRICE ? '' : '-' + (item.PKPRICE - item.SELLPRICE).toFixed(2)}</div>
                        <div
                          className='invoicePopupPrice_style1'>{item.PKPRICE === item.SELLPRICE ? '' : '-' + Math.floor(((item.PKPRICE - item.SELLPRICE) / item.PKPRICE) * 100) + '%'}</div>
                        <div className='invoicePopupPrice_style1'
                             style={{alignSelf: 'flex-end'}}>{item.SELLPRICE.toFixed(2)}<br/></div>
                      </div>
                    </div>
                  )
                })
              }
              <div className='invoicePopupMount'>
                <div className='invoicePopupMount_style1'>Subtotal:</div>
                <div className='invoicePopupMount_style2'>${order.SUBTOTAL.toFixed(2)}</div>
                <div className='invoicePopupMount_style1'>Tax:</div>
                <div className='invoicePopupMount_style2'>${(Number(order.TAX1) + Number(order.TAX2)).toFixed(2)}</div>
                <div className='invoicePopupMount_style1'>Total {order.CURRID}:</div>
                <div className='invoicePopupMount_style2'>${order.TOTAL.toFixed(2)}</div>
              </div>
              <div className='invoicePopupTxt'>
                You earned {point} points with this transaction. It was a pleasure to meet you!
                For more information or for your FREE Business Analysis, contact us at<br/>
                1-800-820- 1412 or info@multidev.com Please, visit: www.multidev.com
              </div>
            </div>
            <div className='popupInfo_1'>
              <h2 id='popupHeader'>Payment List</h2>
              {
                order.PAYMENTS.map((item, index) => {
                  return (

                    <div
                      style={{display: 'flex', flexFlow: 'row', justifyContent: 'space-around'}} key={index}>
                      <div style={{width:'15%'}}>{item.PAYMENTDATE !== null ? item.PAYMENTDATE.substring(0, 16) : ''}</div>
                      <div style={{width:'15%'}}>{item.DESC_1}</div>
                      <div style={{width:'15%'}}>{item.CREDCARD_NUM}</div>
                      <div style={{width:'15%', textAlign: 'right'}}>$ {item.AMOUNTPAID.toFixed(2)}</div>
                    </div>

                  )
                })
              }
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
