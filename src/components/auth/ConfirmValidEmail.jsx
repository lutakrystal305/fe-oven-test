import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AuthApi from 'apis/auth';
import { SCREEN_PATH } from 'constants';
import { TYPE_NOTIFY } from 'constants';
import { OpenNotificatoin } from 'components/common/notifications';

const ConfirmValidEmail = () => {
  const [searchParms] = useSearchParams();
  const [msg, setMsg] = useState(null);
  const navigate = useNavigate();

  useEffect(async () => {
    if (searchParms.get('token')) {
      const res = await AuthApi.confirmValidEmail({ token: searchParms.get('token') });
      setMsg(res.data.message);
      OpenNotificatoin('Valid Email', res.data.data.message, TYPE_NOTIFY.SUCCESS);
      setTimeout(() => {
        navigate(SCREEN_PATH.LOGIN);
      }, 2000);
    }
  }, []);

  return (
    <div className="ConfirmValidEmail d-flex justify-content-center align-items-center w-100 h-100">
      {msg ? <h6>{msg}</h6> : <p>Loading ...</p>}
    </div>
  );
};

export default ConfirmValidEmail;
