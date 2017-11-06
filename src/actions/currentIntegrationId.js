import * as types from '../constants/ActionTypes';

export function setCurrentIntegration(integration) {
  return {
    type: types.SET_CURRENT_INTEGRATION,
    integration,
  };
}

export default {
  setCurrentIntegration,
};
