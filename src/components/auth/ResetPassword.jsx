import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AuthApi from 'apis/auth';
import { useSearchParams } from 'react-router-dom';
import { TYPE_NOTIFY } from 'constants';
import { OpenNotificatoin } from 'components/common/notifications';

const ResetPassword = () => {
  const [searchParms] = useSearchParams();
  const schema = yup.object({
    new_password: yup.string().required().min(6).max(100),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref('new_password')], 'Passwords do not match')
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const handleResetPassowrd = async (data) => {
    try {
      const result = await AuthApi.resetPassword({
        password: data.new_password,
        token: searchParms.get('token')
      });
      OpenNotificatoin('Reset Password', result.data.data.message, TYPE_NOTIFY.SUCCESS);
    } catch (err) {
      OpenNotificatoin('Reset Password', err.message, TYPE_NOTIFY.ERROR);
    }
  };

  useEffect(() => {}, [errors]);

  return (
    <div className="ResetPassword d-flex w-100 h-100 justify-content-center">
      <form className="d-flex flex-column justify-content-center align-items-center">
        <input type="password" placeholder="New Password" {...register('new_password')} />
        <input
          type="password"
          placeholder="Confirm New Password"
          {...register('confirmPassword')}
        />
        {errors && (errors.newPassword || errors.oldPassword) && (
          <p style={{ color: '#f00' }}>
            {errors.newwPassword.message || errors.oldPassword.message}
          </p>
        )}
        <button onClick={handleSubmit(handleResetPassowrd)}>Submit</button>
      </form>
    </div>
  );
};

export default ResetPassword;
