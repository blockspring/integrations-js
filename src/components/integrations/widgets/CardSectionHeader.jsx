import React from 'react';
import PropTypes from 'prop-types';

class CardSectionHeader extends React.Component {
  render() {
    return (
      <div
        className="ijs-card-section-header"
      >
        { this.props.title }
      </div>
    );
  }
}

CardSectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default CardSectionHeader;
