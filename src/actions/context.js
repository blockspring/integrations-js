import * as types from '../constants/ActionTypes';

export function setContext(context) {
  return {
    type: types.SET_CONTEXT,
    context,
  };
}

export default {
  setContext,
};
