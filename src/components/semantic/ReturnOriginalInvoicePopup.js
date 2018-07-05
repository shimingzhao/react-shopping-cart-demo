import React, {Component} from 'react'
import Modal from 'react-responsive-modal';
import {Button, Dimmer, Loader} from 'semantic-ui-react'
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
    const {otherorder, item, loading} = this.props
    let point = 0
    console.log('====> otherorder <====s')
    console.log('loading ' + loading)
    const {open} = this.state;
    return (
      <div>
        <a className='popupTrigger' style={{color: 'SteelBlue', textDecoration: 'underline', cursor: 'pointer'}}
           onClick={this.onOpenModal}>
          {item.ORIGINALTRANSACTION.Returned_fromINV !== undefined ? item.ORIGINALTRANSACTION.Returned_fromINV : item.RETURN.Returned_onINV !== undefined ? item.RETURN.Returned_onINV : ''}
          {/*{item.ORIGINALTRANSACTION.Returned_fromINV !==undefined ? item.ORIGINALTRANSACTION.Returned_fromINV : item.RETURN.Returned_onINV }*/}
        </a>
        <Modal open={open} onClose={this.onCloseModal} little>
          <Dimmer active={otherorder && loading == true && true} inverted>
            <Loader active inverted content='Loading'/>
          </Dimmer>
          <div>
            <div id='invoicePopupBody' ref={el => (this.componentRef = el)}>
              <h2 id='popupHeader'>Invoice Number - {otherorder.INVOICE}</h2>
              <div>Thanks for your purchase.</div>

              <div className='invoicePopupCustomer'>
                <div className='popupInfo'
                     style={{display: otherorder.ORDERDETAILS[0].CUSTOMERSHIPTO.NAME1 ? '' : 'none', width: '50%'}}
                >
                  {(otherorder.ORDERDETAILS[0].CUSTOMERSHIPTO.NAME2 === undefined ? '' : otherorder.ORDERDETAILS[0].CUSTOMERSHIPTO.NAME2 + ' ') + otherorder.ORDERDETAILS[0].CUSTOMERSHIPTO.NAME1}<br/>
                  {otherorder.ORDERDETAILS[0].CUSTOMERSHIPTO.ADDRESS1 + ', ' +
                  otherorder.ORDERDETAILS[0].CUSTOMERSHIPTO.CITY + ', ' +
                  otherorder.ORDERDETAILS[0].CUSTOMERSHIPTO.COUNTRYID + ', ' +
                  otherorder.ORDERDETAILS[0].CUSTOMERSHIPTO.ZIPCODE}<br/>
                  <span
                    style={{display: otherorder.ORDERDETAILS[0].CUSTOMERSHIPTO.AREACODE ? '' : 'none'}}>Tel: ({otherorder.ORDERDETAILS[0].CUSTOMERSHIPTO.AREACODE}){otherorder.ORDERDETAILS[0].CUSTOMERSHIPTO.PRIMARYTEL}</span>
                </div>
                <div className='popupInfo' style={{flexGrow: '1'}}>
                  <p>
                    {otherorder.STOREINFO.STORENAME}<br/>
                    {
                      otherorder.STOREINFO.STOREADDRESS1 + ', ' +
                      (otherorder.STOREINFO.STOREADDRESS2 ? otherorder.STOREINFO.STOREADDRESS2 + ', ' : '') +
                      otherorder.STOREINFO.STORECITY + ', ' +
                      otherorder.STOREINFO.STORESTATEPROV + ', ' +
                      otherorder.STOREINFO.STORECOUNTRYID
                    }
                    <br/>
                    Tel: ({otherorder.STOREINFO.STOREAREACODE}) {otherorder.STOREINFO.STOREPRIMARYTEL}
                  </p>
                </div>
              </div>

              <div className='popupInfo'>
                <p>Purchased data: {otherorder.ORDERDATE.substring(0, 16)}</p>
              </div>

              {
                otherorder.ORDERDETAILS.map((item, index) => {
                  point += item.LOYALTYPOINTS
                  return (
                    <div key={index} className='invoicePopupItems'>
                      <div className='invoicePopupShipto'>
                        <div>{item.DESC_1 !== null ? item.DESC_1.toUpperCase() : ''}</div>
                        <div style={{display: item.CUSTOMERSHIPTO.NAME1 && item.COORDINATEGRP !== 'NA' ? '' : 'none'}}>
                          SHIP TO: &nbsp;&nbsp;
                          {
                            (item.CUSTOMERSHIPTO.NAME2 === undefined ? '' : item.CUSTOMERSHIPTO.NAME2 + ' ') +
                            item.CUSTOMERSHIPTO.NAME1 + ', ' +
                            item.CUSTOMERSHIPTO.ADDRESS1 + ', ' +
                            item.CUSTOMERSHIPTO.CITY + ', ' +
                            item.CUSTOMERSHIPTO.COUNTRYID + ', ' +
                            item.CUSTOMERSHIPTO.ZIPCODE
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
                <div className='invoicePopupMount_style2'>${otherorder.SUBTOTAL.toFixed(2)}</div>
                <div className='invoicePopupMount_style1'>Tax:</div>
                <div
                  className='invoicePopupMount_style2'>${Number(otherorder.TAX1.toFixed(2)) + Number(otherorder.TAX2.toFixed(2))}</div>
                <div className='invoicePopupMount_style1'>Total {otherorder.CURRID}:</div>
                <div className='invoicePopupMount_style2'>${otherorder.TOTAL.toFixed(2)}</div>
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
                otherorder.PAYMENTS.map((item, index) => {
                  return (

                    <div
                      style={{display: 'flex', flexFlow: 'row', justifyContent: 'space-around'}} key={index}>
                      <div style={{width:'15%'}}>{item.PAYMENTDATE !== null ? item.PAYMENTDATE.substring(0, 16) : ''}</div>
                      <div style={{width:'15%'}}>>{item.DESC_1}</div>
                      <div style={{width:'15%'}}>>{item.CREDCARD_NUM}</div>
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
