import React from 'react';
import PropTypes from 'prop-types';

class CardBody extends React.Component {
  render() {
    return (
      <div
        className="ijs-card-body"
      >
        { this.props.children }
      </div>
    );
  }
}

CardBody.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CardBody;
