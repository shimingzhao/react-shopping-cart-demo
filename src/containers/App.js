import React from 'react'
import PropTypes from 'prop-types'
import Header2 from '../components/common/Header2'
import '../stylesheets/main.scss'


class App extends React.Component {

  renderChildren() {
    return React.Children.map(this.props.children, child => {
      return React.cloneElement(child, { })
    })
  }

  render() {
    return (
      <div className="grid">
        <div className="grid__row grid__row--lg">
          <div className="grid__item">
            <Header2 />
          </div>
        </div>
        {this.renderChildren()}
      </div>
    );
  }
}
App.propTypes = {
  children: PropTypes.object.isRequired
};

export default App;
