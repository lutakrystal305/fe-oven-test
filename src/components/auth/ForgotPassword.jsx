import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AuthApi from 'apis/auth';
import { OpenNotificatoin } from 'components/common/notifications';
import { TYPE_NOTIFY } from 'constants';

const ForgotPassword = () => {
  const [msg, setMsg] = useState(null);
  const schema = yup.object({
    email: yup.string().required().min(8).max(150).email()
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const handleForgotPassowrd = async (data) => {
    try {
      const result = await AuthApi.forgotPassword({ email: data.email });
      setMsg(result.data.data.message);
      OpenNotificatoin('Forgot Password', result.data.data.message, TYPE_NOTIFY.SUCCESS);
    } catch (err) {
      setMsg(err.message);
      OpenNotificatoin('Forgot Password', err.message, TYPE_NOTIFY.ERROR);
    }
  };

  return (
    <div className="ForgotPassword d-flex w-100 h-100 justify-content-center">
      <h5>Forgot Password</h5>
      {msg && <p>{msg}</p>}
      <form>
        <input type="text" placeholder="email" {...register('email')} />
        {errors && errors.email && <p style={{ color: '#f00' }}>{errors.email}</p>}
        <button onClick={handleSubmit(handleForgotPassowrd)}>Submit</button>
      </form>
    </div>
  );
};

export default ForgotPassword;
