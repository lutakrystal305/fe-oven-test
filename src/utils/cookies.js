import Cookies from 'js-cookie';

const setCookie = (key, value) => {
  Cookies.set(key, value, {
    expires: process.env.REACT_APP_EXPIRE_COOKIE ? +process.env.NEXT_PUBLIC_EXPIRE_COOKIE : 1,
    path: '/'
  });
};

const getCookie = (key) => {
  return Cookies.get(key);
};

const removeCookie = (key) => {
  Cookies.remove(key);
};

const removeAllCookie = () => {
  Object.keys(Cookies.get()).forEach(function (cookieName) {
    Cookies.remove(cookieName);
  });
};

export default { setCookie, getCookie, removeCookie, removeAllCookie };
