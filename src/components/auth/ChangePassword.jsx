import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AuthApi from 'apis/auth';
import { OpenNotificatoin } from 'components/common/notifications';
import { TYPE_NOTIFY } from 'constants';

const ChangePassword = () => {
  const [msg, setMsg] = useState(null);
  const schema = yup.object({
    oldPassword: yup.string().require(),
    newPassword: yup
      .string()
      .required()
      .min(6)
      .max(100)
      .matches(
        /^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{6,}$/,
        'Your password must be minimum 6 character, have at least a letter and a number'
      ),
    confirmPassword: yup
      .string()
      .required()
      .oneOf([yup.ref('newPassword')], 'Passwords do not match')
  });

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  });

  const handleChangePassowrd = async (data) => {
    try {
      const result = await AuthApi.changePassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword
      });
      OpenNotificatoin('Change Password', result.data.data.message, TYPE_NOTIFY.SUCCESS);
    } catch (err) {
      setMsg(err.message);
      OpenNotificatoin('Change Password', err.message, TYPE_NOTIFY.ERROR);
    }
  };
  return (
    <div className="ChangePassword d-flex w-100 h-100 justify-content-center">
      <h5>Change Password</h5>
      {msg && <p>{msg}</p>}
      <form>
        <input type="password" placeholder="Current Password" {...register('oldPassword')} />
        <input type="password" placeholder="New Password" {...register('newPassword')} />
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
        <button onClick={handleSubmit(handleChangePassowrd)}>Submit</button>
      </form>
    </div>
  );
};

export default ChangePassword;
