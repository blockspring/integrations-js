import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import currentIntegrationIdActions from '../../../actions/currentIntegrationId';

class CardHeader extends React.Component {
  render() {
    return (
      <div
        className="ijs-card-header"
        style={{
          backgroundColor: this.props.backgroundColor,
          color: this.props.textColor,
        }}
      >
        { this.props.title }
        <button
          style={{
            color: this.props.textColor,
          }}
          className="ijs-card-header-action"
          onClick={() => this.props.setCurrentIntegration(null)}
        >
          Close
        </button>
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
    ...bindActionCreators({ ...currentIntegrationIdActions }, dispatch),
  };
};

CardHeader.propTypes = {
  title: PropTypes.string.isRequired,
  setCurrentIntegration: PropTypes.func.isRequired,
};

export const DumbCardHeader = CardHeader;
export default connect(mapStateToProps, mapDispatchToProps)(CardHeader);
