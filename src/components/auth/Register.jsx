import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import SignUpSchema from 'utils/validates/register';
import AuthApi from 'apis/auth';
import { useNavigate } from 'react-router-dom';
import { SCREEN_PATH } from 'constants';
import { TYPE_NOTIFY } from 'constants';
import { OpenNotificatoin } from 'components/common/notifications';

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(SignUpSchema)
  });

  const navigate = useNavigate();

  const handleLogin = async (data) => {
    if (data.password !== data.confirmPassword) {
      OpenNotificatoin('Register', 'Password and Confirm Password', TYPE_NOTIFY.ERROR);
      return;
    }
    try {
      const res = await AuthApi.register({
        name: data.name,
        email: data.email,
        password: data.password
      });
      if (res.data) {
        navigate(SCREEN_PATH.LOGIN);
      }
      OpenNotificatoin('Register', res.data.data.message, TYPE_NOTIFY.SUCCESS);
    } catch (err) {
      OpenNotificatoin('Register', err.message, TYPE_NOTIFY.ERROR);
    }
  };
  return (
    <div className="Register d-flex w-100 h-100 justify-content-center">
      <form
        className="d-flex flex-column px-4 py-3"
        style={{ border: '1px solid #aaa', borderRadius: '8px' }}>
        <h5 className="text-center">Sign Up</h5>
        <input className="my-2" type="text" placeholder="Name" {...register('name')} />
        <input className="my-2" type="text" placeholder="Email" {...register('email')} />
        <input className="my-2" type="password" placeholder="Password" {...register('password')} />
        <input
          className="my-2"
          type="password"
          placeholder="Confirm Password"
          {...register('confirmPassword')}
        />
        {errors && errors.name && (
          <p className="my-3" style={{ color: '#f00' }}>
            {errors.name.message}
          </p>
        )}
        {errors && errors.email && (
          <p className="my-3" style={{ color: '#f00' }}>
            {errors.email.message}
          </p>
        )}
        {errors && errors.password && (
          <p className="my-3" style={{ color: '#f00' }}>
            {errors.password.message}
          </p>
        )}
        {errors && errors.confirmPassword && (
          <p className="my-3" style={{ color: '#f00' }}>
            {errors.confirmPassword.message}
          </p>
        )}
        <button className="my-3 px-3 py-2 btn btn-success" onClick={handleSubmit(handleLogin)}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Register;
