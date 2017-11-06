import {
  applyMiddleware, compose, createStore as createReduxStore,
} from 'redux';
import thunk from 'redux-thunk';
import createRootReducer from '../reducers/root';

const createStore = (initialState = {}, extraArgument = {}) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [thunk.withExtraArgument(extraArgument)];

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = [];
  let composeEnhancers = compose;

  /* istanbul ignore if */
  if (__DEV__) {
    if (typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'function') { // eslint-disable-line no-underscore-dangle
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__; // eslint-disable-line no-underscore-dangle,max-len
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createReduxStore(
    createRootReducer(),
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers,
    ),
  );

  store.asyncReducers = {};

  /* istanbul ignore if */
  if (module.hot) {
    module.hot.accept('../reducers/root', () => {
      const reducers = require('../reducers/root').default; // eslint-disable-line
      store.replaceReducer(reducers(store.asyncReducers));
    });
  }

  return store;
};

export default createStore;
