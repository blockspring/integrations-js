import * as types from '../constants/ActionTypes';

export default function (state = null, action) {
  switch (action.type) {
    case types.SET_CONFIG:
      return action.config;
    default:
      return state;
  }
}
