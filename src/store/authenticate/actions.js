import { AUTHED, LOGOUT } from 'constants/actionTypes';

export const authed = (payload) => {
  return {
    type: AUTHED,
    payload
  };
};

export const logout = (payload) => {
  return {
    type: LOGOUT,
    payload
  };
};
