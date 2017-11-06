import * as types from '../constants/ActionTypes';

export default function (state = null, action) {
  switch (action.type) {
    case types.SET_SITE_ID:
      return action.siteId;
    default:
      return state;
  }
}
