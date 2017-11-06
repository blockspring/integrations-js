import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import integrations from '../constants/Integrations';
import shouldRenderByContext from '../util/shouldRender';

class SideBar extends React.Component {
  renderIntegration() {
    const integration = integrations[this.props.currentIntegrationId];

    if (integration && shouldRenderByContext(this.props.context, integration.contextSelectors)) {
      return <integration.component />;
    }

    return <div />;
  }

  render() {
    return (
      <div className="ijs-side-bar">
        { this.renderIntegration() }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentIntegrationId: state.currentIntegrationId,
    context: state.context,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({}, dispatch),
  };
};

export const DumbSideBar = SideBar;
export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
