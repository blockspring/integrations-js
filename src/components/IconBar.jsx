import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';
import shouldRenderByContext from '../util/shouldRender';
import currentIntegrationIdActions from '../actions/currentIntegrationId';
import integrations from '../constants/Integrations';

class IconBar extends React.Component {
  setIntegration = (e) => {
    const { integration } = e.currentTarget.dataset;
    if (this.props.currentIntegrationId === integration) {
      this.props.setCurrentIntegration(null);
    } else {
      this.props.setCurrentIntegration(integration);
    }
  }

  render() {
    const { enabledIntegrations } = this.props.config;
    return (
      <div className="ijs-icon-bar">
        {
          Object.keys(integrations).map((id) => {
            const integration = integrations[id];
            const shouldRender = shouldRenderByContext(
              this.props.context,
              integration.contextSelectors,
            );

            const classes = classnames({
              'ijs-icon-bar-button': true,
              'ijs-icon-bar-button-selected': (
                integration.id === this.props.currentIntegrationId
              ),
            });

            if (
              !shouldRender ||
              enabledIntegrations.indexOf(integration.id) === -1
            ) {
              return null;
            }

            return (
              <div
                key={integration.id}
                className={classes}
                data-integration={integration.id}
                onClick={this.setIntegration}
                tabIndex="0"
                role="button"
                onKeyPress={null}
              >
                <img
                  src={integration.icon}
                  alt={integration.name}
                />
                <div
                  className="ijs-icon-bar-button-indicator"
                  style={{
                    backgroundColor: integration.backgroundColor,
                  }}
                />
              </div>
            );
          })
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentIntegrationId: state.currentIntegrationId,
    context: state.context,
    config: state.config,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({ ...currentIntegrationIdActions }, dispatch),
  };
};

export const DumbIconBar = IconBar;
export default connect(mapStateToProps, mapDispatchToProps)(IconBar);
