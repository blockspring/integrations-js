/* eslint-disable no-proto */
import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader'; // eslint-disable-line

import createStore from './store/createStore';
import Root from './containers/Root';

import IntegrationsJs from './sdk/integrations';

import './polyfills';
import './styles/namespace.scss';

const onReady = () => {
  function generateSessionId() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return `${s4() + s4()}-${s4()}-${s4()}-${
      s4()}-${s4()}${s4()}${s4()}`;
  }

  // Don't boot if a search bot
  if (
    navigator &&
    navigator.userAgent &&
    /bot|googlebot|crawler|spider|robot|crawling/i.test(navigator.userAgent)
  ) {
    return;
  }

  let rootEl = document.getElementById('integrations-js');

  if (!rootEl) {
    rootEl = document.createElement('div');
    rootEl.id = 'integrations-js';
    document.body.appendChild(rootEl);
  }

  if (rootEl) {
    // give access to client in dev tools
    // if (__DEV__) {
    //   window.chatClient = chatClient;
    // }

    const { siteId } = window.integrations;

    const sessionId = localStorage.getItem(`ijs-session-id-${siteId}`) || generateSessionId();

    localStorage.setItem(`ijs-session-id-${siteId}`, sessionId);

    const initialState = {
      siteId,
      sessionId,
    };
    const store = createStore(initialState, {});

    const integrations = new IntegrationsJs(
      siteId,
      store.dispatch,
    );

    let queue = window.integrations || [];
    while (queue && queue.length > 0) {
      const args = queue.shift();
      const method = args.shift();

      if (typeof integrations[method] === 'function') {
        integrations[method](...args);
      }
    }

    queue = null;

    window.integrations = integrations;

    // give access to store in dev tools
    if (__DEV__) {
      window.store = store;
    }

    ReactDOM.render(
      <AppContainer>
        <Root
          store={store}
        />
      </AppContainer>,
      rootEl,
    );

    if (module.hot) {
      module.hot.accept('./containers/Root', () => {
        const RootContainer = require('./containers/Root').default; // eslint-disable-line global-require

        ReactDOM.render(
          <AppContainer>
            <RootContainer
              store={store}
            />
          </AppContainer>,
          rootEl,
        );
      });
    }
  }
};

if (document.readyState !== 'loading') {
  onReady();
} else {
  document.addEventListener('DOMContentLoaded', onReady);
}
