import * as types from '../constants/ActionTypes';

export default function (state = {}, action) {
  switch (action.type) {
    case types.SET_CONTEXT:
      return action.context;
    default:
      return state;
  }
}
