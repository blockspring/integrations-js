import * as types from '../constants/ActionTypes';

export function setUser(user) {
  return {
    type: types.SET_USER,
    user,
  };
}

export default {
  setUser,
};
