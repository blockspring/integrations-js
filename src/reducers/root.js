import { combineReducers } from 'redux';
import siteId from './siteId';
import currentIntegrationId from './currentIntegrationId';
import user from './user';
import config from './config';
import context from './context';
import sessionId from './sessionId';

const rootReducer = function rootReducer(asyncReducers = {}) {
  return combineReducers({
    siteId,
    currentIntegrationId,
    user,
    context,
    sessionId,
    config,
    ...asyncReducers,
  });
};

export default rootReducer;
