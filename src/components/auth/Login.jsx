import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import SignInSchema from 'utils/validates/login';
import { Link, useNavigate } from 'react-router-dom';
import { SCREEN_PATH } from 'constants';
import AuthApi from 'apis/auth';
import { authed } from 'store/authenticate/actions';
import { useDispatch } from 'react-redux';
import { TYPE_NOTIFY } from 'constants';
import { OpenNotificatoin } from 'components/common/notifications';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(SignInSchema)
  });

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleLogin = async (data) => {
    try {
      const res = await AuthApi.login({ email: data.email, password: data.password });
      if (res.data) {
        dispatch(authed(res.data.data));
        navigate(SCREEN_PATH.HOME);
        OpenNotificatoin('Sign In', res.data.data.message, TYPE_NOTIFY.SUCCESS);
      }
    } catch (err) {
      OpenNotificatoin('Sign In', err.message, TYPE_NOTIFY.ERROR);
    }
  };

  return (
    <div className="LoginForm d-flex w-100 h-100 justify-content-center">
      <form
        className="d-flex flex-column px-4 py-3"
        style={{ border: '1px solid #aaa', borderRadius: '8px' }}>
        <h5 className="text-center">Login</h5>
        <div className="d-flex flex-column">
          <input className="my-2" type="text" placeholder="email" {...register('email')} />
          <input
            className="my-2"
            type="password"
            placeholder="password"
            {...register('password')}
          />
        </div>
        <div className="my-3 w-100">
          <Link className="mx-3" to={SCREEN_PATH.REGISTER}>
            Register
          </Link>
          <Link to={SCREEN_PATH.FORGOT_PASS}>Forgot password</Link>
        </div>
        {errors && (errors.email || errors.password) && (
          <p className="my-3" style={{ color: '#f00' }}>
            {errors.email || errors.password}
          </p>
        )}
        <button className="px-3 py-2 btn btn-info my-3" onClick={handleSubmit(handleLogin)}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
