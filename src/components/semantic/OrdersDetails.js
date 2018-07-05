import React, {Component} from 'react'
import {Grid, Image, Popup, Segment, Icon, Header} from 'semantic-ui-react'
import InvoicePopup from './InvoicePopup'
import PaymentPopup from "./PaymentPopup";
import ReturnOriginalInvoicePopup from './ReturnOriginalInvoicePopup'
import 'semantic-ui-css/semantic.min.css'

const isEmpty = (obj) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}

class OrdersDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  componentWillUpdate(nextProps) {
    if ((this.props.found_order === undefined || this.props.found_order === nextProps.found_order) && this.state.visible !== nextProps.allVisible) {
      this.setState({visible: nextProps.allVisible})
    }
    if (nextProps.page !== this.props.page) {
      this.setState({visible: false})
    }
  }

  toggleVisibility = () => this.setState({visible: !this.state.visible})

  render() {
    const {row, findOrder, found_order} = this.props;
    console.log('~~~~~~~~~~find order details start ~~~~~~~~~')
    console.log(found_order)
    console.log('~~~~~~~~~~find order details end ~~~~~~~~~')

    return (
      <Segment className='ordersdetails' raised tertiary
               style={{padding: '0.050rem', border: '0.050rem', display: !isEmpty(row.ORDERDETAILS) ? '' : 'none'}}>

        <Grid celled divided stretched style={{margin: '0px', border: '0px'}}>

          <div className='ordersHeader_style' key={row.ORDERID}>
            <div className='ordersHeaderItem_style'>
              ORDER DATE <br/>
              {row.ORDERDATE.substring(6, 16)}
            </div>
            {
              row.BALANCE === 0 ?
                <div className='ordersHeaderItem_style'>
                  TOTAL <br/>
                  $ {row.TOTAL.toFixed(2)}
                </div>
                :
                <div className='ordersHeaderItem_style'>
                  BALANCE <br/>
                  $ {row.BALANCE.toFixed(2)}
                </div>
            }
            {/*<div className='ordersHeaderItem_style'>*/}
            {/*STORE<br/>*/}
            {/*{row.ORDERDETAILS[0] ? row.ORDERDETAILS[0].STORENAME : 'N/A'}*/}
            {/*</div>*/}
            <div className='ordersHeaderItem_style'>
              ITEMS<br/>
              {row.ORDERDETAILS.length}
            </div>
            <div className='ordersHeaderItem_style'>
              ORDER#<br/>
                <PaymentPopup order={row} />
            </div>
            <div className='ordersHeaderItem_style'
                 style={{display: !row.PARENTORDERID || row.PARENTORDERID === row.ORDERID ? 'none' : ''}}
            >
              PARENT ORDER#<br/>
              {row.PARENTORDERID}
            </div>
            <div className='ordersHeaderItem_style'
                 style={{display: row.CUSTPO === null ? 'none' : ''}}
            >
              WEB TRANSACTION# <br/>
              {row.CUSTPO}
            </div>
            <div className='ordersHeaderItem_style'
              // style={{display: row.ORDERDETAILS[0].INVOICE === 'N/A' ? 'none' : ''}}>
                 style={{display: row.INVOICE === 'N/A' ? 'none' : ''}}>
              INVOICE#<br/>
              <InvoicePopup order={row}/>
            </div>
            <div style={{marginLeft: 'auto', cursor: 'pointer'}} onClick={this.toggleVisibility}>
              <Icon name={this.state.visible === false ? 'plus' : 'minus'}/>
            </div>
          </div>
          <Grid.Row
            style={{border: '0px', padding: '0px', display: this.state.visible ? '' : 'none'}}>
            {
              row.ORDERDETAILS.map((item, index) => {
                  const caseFlag =
                    !isEmpty(item.ORIGINALTRANSACTION) ? 'return' : !isEmpty(item.DELIVERY) ? 'delivery' : item.SPECIALLINETYPE !== 'L' && item.QRESERVED === 0 ? 'pickedup' : 'layaway'
                  switch (caseFlag) {
                    case 'return':
                      return (
                        <Grid celled key={index} style={{margin: '0px', border: '0px'}}>
                          <div className='ordersDetailHeader_style'>
                            <div className='ordersDetailHeaderItem_style'>
                              <Icon name='refresh'/>
                              &nbsp;&nbsp;RETURN ITEMS
                            </div>
                            <div className='ordersDetailHeaderItem_style'>
                              STORE:<br/>{row.STOREINFO.STORENAME}
                            </div>
                          </div>
                          <div className='ordersDetailRow_style'>
                            <div className='ordersDetailItemDesc_style1'>
                              <div>
                                <Popup
                                  hoverable
                                  trigger={item.DIMDESC_1 === '' ? <a style={{
                                      color: 'SteelBlue',
                                      textDecoration: 'underline',
                                      cursor: 'pointer'
                                    }}>{item.DESC_1}</a> :
                                    <a style={{
                                      color: 'SteelBlue',
                                      textDecoration: 'underline',
                                      cursor: 'pointer'
                                    }}>{item.DESC_1} - {item.DIMDESC_1}</a>}
                                  content={<Image
                                    src='https://gloimg.gbtcdn.com/gb/pdm-provider-img/straight-product-img/20171108/T011046/T0110460013/goods-img/1510083062035740824.jpg'
                                    size='huge'/>}
                                  on='hover'
                                  hideOnScroll
                                  position='right center'
                                />
                                &nbsp;&nbsp;&nbsp;&nbsp;{item.SKUID} - {item.PRODUCTCODE}
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                ({item.LOYALTYPOINTS}pts)
                              </div>
                              <div style={{display: 'flex', flexDirection:'row',paddingBottom:'0.20rem'}}>
                                {/*Original invoice: {item.ORIGINALTRANSACTION.Returned_fromINV}*/}
                                <div style={{paddingRight:'1rem'}}>Original invoice:</div>
                                <div style={{paddingRight:'2rem'}}
                                  onClick={() => {
                                    findOrder(1,item.ORIGINALTRANSACTION.Returned_fromINV)
                                }}>
                                  <ReturnOriginalInvoicePopup
                                    otherorder={found_order.data.data !== undefined ? found_order.data.data[0] : row}
                                    item={item}
                                    loading={found_order.isFetching}
                                  />
                                </div>
                                <div style={{paddingRight:'1rem'}}>Purchased on:</div>
                                <div>{item.ORIGINALTRANSACTION.Purchased_On.substring(6, 16)}</div>
                              </div>
                            </div>
                            <div className='ordersDetailItemDesc_style2'>
                              {
                                item.PKPRICE !== item.SELLPRICE ?
                                  <div className='ordersDetailItemDesc_style3'>{item.QORDERED} x&nbsp;&nbsp;&nbsp;
                                    Actual price: ${item.PKPRICE.toFixed(2)}<br/>
                                    Discount: ${(item.PKPRICE - item.SELLPRICE).toFixed(2)}<br/>
                                    Sell price: ${item.SELLPRICE.toFixed(2)}<br/>
                                  </div>
                                  :
                                  <div className='ordersDetailItemDesc_style3'>{item.QORDERED} x&nbsp;&nbsp;&nbsp;
                                    Sell price: ${item.SELLPRICE.toFixed(2)}<br/>
                                  </div>
                              }
                            </div>
                          </div>
                        </Grid>
                      )
                      break;
                    case 'delivery':
                      return (
                        <Grid celled key={index} style={{margin: '0px', border: '0px'}}>
                          <div className='ordersDetailHeader_style'
                               style={{
                                 display: index === 0 || item.DELIVERY.INVDELID !== row.ORDERDETAILS[index - 1].DELIVERY.INVDELID ? '' : 'none'
                               }}>
                            <div className='ordersDetailHeaderItem_style'>
                              <Icon name='shipping'/>
                              &nbsp;&nbsp;DELIVERY ITEMS
                            </div>
                            <div className='ordersDetailHeaderItem_style'>
                              DELIVERY#:<br/> {item.DELIVERY.INVDELID}
                            </div>
                            <div className='ordersDetailHeaderItem_style'
                                 style={{display: item.DELIVERY.DELIVERYDATE === null ? 'none' : ''}}>
                              DELIVERY
                              DATE:<br/>{item.DELIVERY.DELIVERYDATE === null ? '' : item.DELIVERY.DELIVERYDATE.substring(6, 16)}
                            </div>
                            <div className='ordersDetailHeaderItem_style'>
                              SHIP TO:<br/>
                              <Popup
                                trigger={<a style={{
                                  color: 'SteelBlue',
                                  textDecoration: 'underline',
                                  cursor: 'pointer'
                                }}>{item.CUSTOMERSHIPTO.NAME1 ?
                                  item.CUSTOMERSHIPTO.NAME1
                                  :
                                  'N/A'
                                }</a>}
                                content={
                                  (item.CUSTOMERSHIPTO.NAME2 === undefined ? '' : item.CUSTOMERSHIPTO.NAME2 + ' ') +
                                  item.CUSTOMERSHIPTO.NAME1 + ', ' +
                                  item.CUSTOMERSHIPTO.ADDRESS1 + ', ' +
                                  item.CUSTOMERSHIPTO.CITY + ', ' +
                                  item.CUSTOMERSHIPTO.COUNTRYID + ', ' +
                                  item.CUSTOMERSHIPTO.ZIPCODE
                                }
                                on='hover'
                                hideOnScroll
                                position='right center'
                              />
                            </div>
                            <div className='ordersDetailHeaderItem_style'
                                 style={{display: item.DELIVERY.SHIPPINGNUMBER === '' ? 'none' : ''}}>
                              TRACKING No.:<br/>{item.DELIVERY.SHIPPINGNUMBER}
                            </div>
                          </div>
                          {
                            item.COORDINATEGRP !== 'NA' ?
                              <div className='ordersDetailRow_style'>
                                <div className='ordersDetailItemDesc_style1'>
                                  <div>
                                    <Popup
                                      hoverable
                                      trigger={item.DIMDESC_1 === '' ? <a style={{
                                          color: 'SteelBlue',
                                          textDecoration: 'underline',
                                          cursor: 'pointer'
                                        }}>{item.DESC_1}</a> :
                                        <a style={{
                                          color: 'SteelBlue',
                                          textDecoration: 'underline',
                                          cursor: 'pointer'
                                        }}>{item.DESC_1} - {item.DIMDESC_1}</a>}
                                      content={<Image
                                        src='https://gloimg.gbtcdn.com/gb/pdm-provider-img/straight-product-img/20171108/T011046/T0110460013/goods-img/1510083062035740824.jpg'
                                        size='huge'/>}
                                      on='hover'
                                      hideOnScroll
                                      position='right center'
                                    />
                                    &nbsp;&nbsp;&nbsp;&nbsp;{item.SKUID} - {item.PRODUCTCODE}
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    ({item.LOYALTYPOINTS}pts)
                                  </div>
                                  {
                                    !isEmpty(item.RETURN)
                                      ?
                                      <div className='returnedStyle'>
                                        <div>Returned Information:</div>
                                        <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                          <div>Date:</div>
                                          <div>{item.RETURN.Returned_On.substring(6, 16)}</div>
                                          <div>Invoice#:</div>
                                          <div onClick={() => {
                                            findOrder(1, item.RETURN.Returned_onINV)
                                          }}>
                                            <ReturnOriginalInvoicePopup
                                              otherorder={found_order.data.data !== undefined ? found_order.data.data[0] : row}
                                              item={item}
                                              loading={found_order.isFetching}
                                            />
                                          </div>
                                          <div>Order#:</div>
                                          <div>{item.RETURN.Returned_onOrder}</div>
                                        </div>
                                      </div>
                                      :
                                      ''
                                  }
                                </div>
                                <div className='ordersDetailItemDesc_style2'>
                                  {
                                    item.PKPRICE !== item.SELLPRICE ?
                                      <div className='ordersDetailItemDesc_style3'>
                                        {item.DELIVERY.ITEMS} x&nbsp;&nbsp;&nbsp;
                                        Actual price: ${item.PKPRICE.toFixed(2)}<br/>
                                        Discount: ${(item.PKPRICE - item.SELLPRICE).toFixed(2)}<br/>
                                        Sell price: ${item.SELLPRICE.toFixed(2)}<br/>
                                      </div>
                                      :
                                      <div className='ordersDetailItemDesc_style3'>
                                        {item.DELIVERY.ITEMS} x&nbsp;&nbsp;&nbsp;
                                        Sell price: ${item.SELLPRICE.toFixed(2)}<br/>
                                      </div>
                                  }
                                </div>
                              </div>
                              :
                              <div className='ordersDetailShipping_style'>
                                <div>SHIPPING
                                  CHARGE &nbsp;&nbsp;&nbsp;&nbsp;{item.SKUID} - {item.PRODUCTCODE} &nbsp;&nbsp;&nbsp;&nbsp;({item.LOYALTYPOINTS}pts)
                                </div>
                                <div>${item.SELLPRICE.toFixed(2)}</div>
                              </div>
                          }
                        </Grid>
                      )
                      break;
                    case 'pickedup':
                      return (
                        <Grid celled key={index} style={{margin: '0px', border: '0px'}}>
                          <div className='ordersDetailHeader_style' style={{
                            // display: index === 0 || !isEmpty(row.ORDERDETAILS[index - 1].DELIVERY) || item.STORENAME !== row.ORDERDETAILS[index - 1].STORENAME ? '' : 'none'
                            display: index === 0 || !isEmpty(row.ORDERDETAILS[index - 1].DELIVERY) ? '' : 'none'
                          }}>
                            <div className='ordersDetailHeaderItem_style'>
                              <Icon name='shopping bag'/>
                              &nbsp;&nbsp;PICKEDUP ITEMS
                            </div>
                            <div className='ordersDetailHeaderItem_style'>
                              STORE: <br/>{row.STOREINFO.STORENAME}
                            </div>
                          </div>
                          <div className='ordersDetailRow_style'>
                            <div className='ordersDetailItemDesc_style1'>
                              <div>
                                <Popup
                                  hoverable
                                  trigger={item.DIMDESC_1 === '' ? <a style={{
                                      color: 'SteelBlue',
                                      textDecoration: 'underline',
                                      cursor: 'pointer'
                                    }}>{item.DESC_1}</a> :
                                    <a style={{
                                      color: 'SteelBlue',
                                      textDecoration: 'underline',
                                      cursor: 'pointer'
                                    }}>{item.DESC_1} - {item.DIMDESC_1}</a>}
                                  content={<Image
                                    src='https://gloimg.gbtcdn.com/gb/pdm-provider-img/straight-product-img/20171108/T011046/T0110460013/goods-img/1510083062035740824.jpg'
                                    size='huge'/>}
                                  on='hover'
                                  hideOnScroll
                                  position='right center'
                                />
                                &nbsp;&nbsp;&nbsp;&nbsp;{item.SKUID} - {item.PRODUCTCODE}
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                ({item.LOYALTYPOINTS}pts)
                              </div>
                              {
                                !isEmpty(item.RETURN)
                                  ?
                                  <div className='returnedStyle'>
                                    <div>Returned Information:</div>
                                    <div style={{display: 'flex', justifyContent: 'space-between'}}>
                                      <div>Date:</div>
                                      <div>{item.RETURN.Returned_On.substring(6, 16)}</div>
                                      <div>Invoice#:</div>
                                      <div onClick={() => {
                                        findOrder(1, item.RETURN.Returned_onINV)
                                      }}>
                                        <ReturnOriginalInvoicePopup
                                          otherorder={found_order.data.data !== undefined ? found_order.data.data[0] : row}
                                          item={item}
                                          loading={found_order.isFetching}
                                        />
                                      </div>
                                      <div>Order#:</div>
                                      <div>{item.RETURN.Returned_onOrder}</div>
                                    </div>
                                  </div>
                                  :
                                  ''
                              }
                            </div>
                            <div className='ordersDetailItemDesc_style2'>
                              {
                                item.PKPRICE !== item.SELLPRICE ?
                                  <div className='ordersDetailItemDesc_style3'>{item.QORDERED} x&nbsp;&nbsp;&nbsp;
                                    Actual price: ${item.PKPRICE.toFixed(2)}<br/>
                                    Discount: ${(item.PKPRICE - item.SELLPRICE).toFixed(2)}<br/>
                                    Sell price: ${item.SELLPRICE.toFixed(2)}<br/>
                                  </div>
                                  :
                                  <div className='ordersDetailItemDesc_style3'>{item.QORDERED} x&nbsp;&nbsp;&nbsp;
                                    Sell price: ${item.SELLPRICE.toFixed(2)}<br/>
                                  </div>
                              }
                            </div>
                          </div>
                        </Grid>
                      )
                      break;
                    case 'layaway':
                      return (
                        <Grid celled key={index} style={{margin: '0px', border: '0px'}}>
                          <div className='ordersDetailHeader_style'>
                            <div className='ordersDetailHeaderItem_style'>
                              <Icon name='add to calendar'/>
                              &nbsp;&nbsp;LAYAWAY ITEMS
                            </div>
                            <div className='ordersDetailHeaderItem_style'>
                              STORE:<br/>{row.STOREINFO.STORENAME}
                            </div>
                          </div>
                          <div className='ordersDetailRow_style'>
                            <div className='ordersDetailItemDesc_style1'>
                              <div>
                                <Popup
                                  hoverable
                                  trigger={item.DIMDESC_1 === '' ? <a style={{
                                      color: 'SteelBlue',
                                      textDecoration: 'underline',
                                      cursor: 'pointer'
                                    }}>{item.DESC_1}</a> :
                                    <a style={{
                                      color: 'SteelBlue',
                                      textDecoration: 'underline',
                                      cursor: 'pointer'
                                    }}>{item.DESC_1} - {item.DIMDESC_1}</a>}
                                  content={<Image
                                    src='https://gloimg.gbtcdn.com/gb/pdm-provider-img/straight-product-img/20171108/T011046/T0110460013/goods-img/1510083062035740824.jpg'
                                    size='huge'/>}
                                  on='hover'
                                  hideOnScroll
                                  position='right center'
                                />
                                &nbsp;&nbsp;&nbsp;&nbsp;{item.SKUID} - {item.PRODUCTCODE}
                                &nbsp;&nbsp;&nbsp;&nbsp;
                                ({item.LOYALTYPOINTS}pts)
                              </div>
                            </div>
                            <div className='ordersDetailItemDesc_style2'>
                              {
                                item.PKPRICE !== item.SELLPRICE ?
                                  <div className='ordersDetailItemDesc_style3'>{item.QORDERED} x&nbsp;&nbsp;&nbsp;
                                    Actual price: ${item.PKPRICE.toFixed(2)}<br/>
                                    Discount: ${(item.PKPRICE - item.SELLPRICE).toFixed(2)}<br/>
                                    Sell price: ${item.SELLPRICE.toFixed(2)}<br/>
                                  </div>
                                  :
                                  <div className='ordersDetailItemDesc_style3'>{item.QORDERED} x&nbsp;&nbsp;&nbsp;
                                    Sell price: ${item.SELLPRICE.toFixed(2)}<br/>
                                  </div>
                              }
                            </div>
                          </div>
                        </Grid>
                      )
                      break;
                  }
                }
              )
            }
          </Grid.Row>
        </Grid>
      </Segment>
    )
  }
}

export default OrdersDetails;
