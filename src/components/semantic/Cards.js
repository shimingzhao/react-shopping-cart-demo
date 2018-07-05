import React from 'react'
import {
  Icon,
  Card,
  Label,
  Menu,
  Table,
  Button,
  Input,
  Checkbox,
  Form,
  Dropdown,
  Segment,
  Statistic,
  Message,
  Modal,
  Header,
  Grid,
  Tab
} from 'semantic-ui-react'

const Cards = props => {
  return (
    <Menu attached='top' className='topMenu'>
      <Menu.Item className="CardsGroup">
        <Card href='#card-example-link-card' className='section'>
          <Statistic size='small' color='grey'>
            <Statistic.Value className='cardNumber'>{props.value}</Statistic.Value>
            <Statistic.Label>Orders</Statistic.Label>
          </Statistic>
        </Card>
      </Menu.Item>
    </Menu>
  )

}


export default Cards