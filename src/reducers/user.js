import * as types from '../constants/ActionTypes';

export default function (state = null, action) {
  switch (action.type) {
    case types.SET_USER:
      return action.user;
    default:
      return state;
  }
}
