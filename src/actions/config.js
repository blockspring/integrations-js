import * as types from '../constants/ActionTypes';

export function setConfig(config) {
  return {
    type: types.SET_CONFIG,
    config,
  };
}

export default {
  setConfig,
};
