import AxiosClient from './axiosClient';

const login = (payload) => {
  return AxiosClient.post('/auth/signIn', payload);
};

const register = (payload) => {
  return AxiosClient.post('/auth/signUp', payload);
};

const changePassword = (payload) => {
  return AxiosClient.post('/auth/changePassword', payload);
};

const confirmValidEmail = ({ token }) => {
  return AxiosClient.patch(`/auth/validEmail/${token}`);
};

const forgotPassword = (payload) => {
  return AxiosClient.post('/auth/confirmResetPassword', payload);
};

const resetPassword = (payload) => {
  return AxiosClient.patch('/auth/resetPassword', payload);
};

export default {
  login,
  register,
  changePassword,
  confirmValidEmail,
  forgotPassword,
  resetPassword
};
