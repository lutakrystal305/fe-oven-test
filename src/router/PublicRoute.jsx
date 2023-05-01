import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import CommonLayout from '../layouts/CommonLayout';
import { useSelector } from 'react-redux';
import { SCREEN_PATH } from 'constants';

const PublicRoute = ({ component: Component, layout: Layout = CommonLayout, ...rest }) => {
  const location = useLocation();
  const { isAuthed } = useSelector((state) => state.authentication);
  return isAuthed && rest.path === SCREEN_PATH.LOGIN ? (
    <Navigate to="/" state={{ from: location }} replace />
  ) : (
    <Layout>
      <Component />
    </Layout>
  );
};

export default PublicRoute;
