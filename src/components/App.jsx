import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classnames from 'classnames';

import configActions from '../actions/config';
import integrations from '../constants/Integrations';
import shouldRender from '../util/shouldRender';
import IconBar from './IconBar';
import SideBar from './SideBar';

class App extends React.Component {
  componentDidMount() {
    this.fetchConfig();
  }

  componentWillUpdate(nextProps) {
    if (nextProps.siteId !== this.props.siteId) {
      this.fetchConfig();
    }
  }

  fetchConfig() {
    if (this.props.siteId) {
      fetch(`${process.env.WEB_ORIGIN}/api/v1/sites/${this.props.siteId}`)
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response;
        })
        .then(r => r.json())
        .then((config) => {
          this.props.setConfig(config);
        })
        .catch((_e) => {
          console.error("[Integrations.js] Couldn't load site config. Make sure you call load with a proper api key");
        });
    }
  }

  render() {
    if (!this.props.config) {
      return <span />;
    }

    const integration = integrations[this.props.currentIntegrationId];
    const classes = classnames({
      'ijs-side-bar-open': integration && shouldRender(
        this.props.context,
        integration.contextSelectors,
      ),
      'ijs-app': true,
    });

    return (
      <div className={classes}>
        <IconBar />
        <SideBar />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentIntegrationId: state.currentIntegrationId,
    context: state.context,
    siteId: state.siteId,
    config: state.config,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    ...bindActionCreators({ ...configActions }, dispatch),
  };
};

export const DumbApp = App;
export default connect(mapStateToProps, mapDispatchToProps)(App);
