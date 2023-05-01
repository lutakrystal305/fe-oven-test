import React from 'react';

import { Navigate, useLocation } from 'react-router-dom';
import CommonLayout from '../layouts/CommonLayout';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, layout: Layout = CommonLayout }) => {
  let location = useLocation();
  const { isAuthed } = useSelector((state) => state.authentication);
  return isAuthed ? (
    <Layout>
      <Component />
    </Layout>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
