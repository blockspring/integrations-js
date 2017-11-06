import React from 'react';
import PropTypes from 'prop-types';

class CardBodyHeader extends React.Component {
  onLeftClick = () => {
    this.props.onChange(-1);
  }

  onRightClick = () => {
    this.props.onChange(1);
  }

  render() {
    return (
      <div
        className="ijs-card-body-header"
      >
        { this.props.title }
        { this.props.onChange &&
          <span className="ijs-card-header-arrows">
            <i
              className="ijs-arrow ijs-arrow-left"
              onClick={this.onLeftClick}
              tabIndex={0}
              role="button"
              onKeyPress={null}
            />
            <i
              className="ijs-arrow ijs-arrow-right"
              onClick={this.onRightClick}
              tabIndex={0}
              role="button"
              onKeyPress={null}
            />
          </span>
        }
      </div>
    );
  }
}

CardBodyHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default CardBodyHeader;
