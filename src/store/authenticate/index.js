import * as types from 'constants/actionTypes';
import CookieHandler from 'utils/cookies';
import { COOKIE_KEY } from 'constants';

const initialState = {
  isAuthed: CookieHandler.getCookie(COOKIE_KEY.ACCESS_TOKEN) ? true : false,
  token: CookieHandler.getCookie(COOKIE_KEY.ACCESS_TOKEN) || '',
  metaData: null
};

const myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.AUTHED: {
      CookieHandler.setCookie(COOKIE_KEY.ACCESS_TOKEN, action.payload.access_token);
      CookieHandler.setCookie(COOKIE_KEY.REFRESH_TOKEN, action.payload.refresh_token);
      CookieHandler.setCookie(COOKIE_KEY.USER_ID, action.payload.id);
      return {
        ...state,
        isAuthed: true,
        token: action.payload.access_token,
        metaData: action.payload.id
      };
    }
    case types.LOGOUT: {
      return { isAuthed: false, token: null, metaData: null };
    }
    default:
      return state;
  }
};

export default myReducer;
