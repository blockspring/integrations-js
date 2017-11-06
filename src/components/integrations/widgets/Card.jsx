import React from 'react';
import PropTypes from 'prop-types';

import CardHeader from './CardHeader';

class Card extends React.Component {
  render() {
    return (
      <div
        className="ijs-card"
      >
        <CardHeader
          title={this.props.title}
          backgroundColor={this.props.backgroundColor}
          textColor={this.props.textColor}
        />
        { this.props.children }
      </div>
    );
  }
}

Card.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Card;
