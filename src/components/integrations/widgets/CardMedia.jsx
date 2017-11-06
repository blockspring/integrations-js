import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class CardMedia extends React.Component {
  render() {
    return (
      <div
        className="ijs-card-media"
      >
        <div className="ijs-card-media-left">
          <img
            className="ijs-card-media-image"
            src={this.props.imageSrc}
            alt={this.props.title}
          />
        </div>
        <div className="ijs-card-media-body">
          <div className="ijs-card-media-title">
            {this.props.title}
          </div>
          <div className="ijs-card-media-subtitle">
            {this.props.subtitle}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (_state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({}, dispatch),
  };
};

CardMedia.propTypes = {
  title: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
};

export const DumbCardMedia = CardMedia;
export default connect(mapStateToProps, mapDispatchToProps)(CardMedia);
