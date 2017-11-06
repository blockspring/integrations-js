import React from 'react';
import PropTypes from 'prop-types';

class CardSection extends React.Component {
  render() {
    return (
      <div
        className="ijs-card-section"
      >
        { this.props.children }
      </div>
    );
  }
}

CardSection.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CardSection;
