import React from 'react'
import {Values} from 'redux-form-website-template'
import {Menu, Grid, Segment} from 'semantic-ui-react'
import Orders from '../semantic/Orders'
import Points  from '../semantic/LoyaltyPoints'

export default class SideBar extends React.Component {
  state = {activeItem: 'orders'}

  handleItemClick = (e, {name}) => {
    console.log(name)
    this.setState({activeItem: name})
  }

  render() {
    const {activeItem} = this.state
    console.log('rendering SideBar')
    console.log(activeItem)

    return (
      <div className='sidebar'>
        <div className='sidebar_1'>
            <Menu pointing secondary>
              <Menu.Item name='orders' active={activeItem === 'orders'} onClick={this.handleItemClick}/>
              <Menu.Item name='points' active={activeItem === 'points'} onClick={this.handleItemClick}/>
              <Menu.Item name='repair' active={activeItem === 'repair'} onClick={this.handleItemClick}/>
              {/*        <Menu.Menu position='right'>
              <Menu.Item name='logout' active={activeItem === 'logout'} onClick={this.handleItemClick} />
            </Menu.Menu>*/}
            </Menu>

        </div>
        <div className='sidebar_1'>
          <Segment basic>
            {(activeItem === 'orders') ? <Orders /> : ''}
            {(activeItem === 'points') ? <Points /> : '' }
          </Segment>
        </div>
      </div>
    )
  }
}