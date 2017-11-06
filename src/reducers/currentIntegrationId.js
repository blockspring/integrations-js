import * as types from '../constants/ActionTypes';

export default function (state = null, action) {
  switch (action.type) {
    case types.SET_CURRENT_INTEGRATION:
      return action.integration;
    default:
      return state;
  }
}
