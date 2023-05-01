import React, { lazy } from 'react';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import CommonLayout from 'layouts/CommonLayout';
import { SCREEN_PATH } from 'constants';

export const ROUTES = [
  {
    path: SCREEN_PATH.HOME,
    component: lazy(() => import('view/HomeView')),
    layout: CommonLayout,
    isPrivate: true
  },
  {
    path: SCREEN_PATH.LOGIN,
    component: lazy(() => import('view/auth/LoginView')),
    layout: CommonLayout,
    isPrivate: false
  },
  {
    path: SCREEN_PATH.REGISTER,
    component: lazy(() => import('view/auth/RegisterView')),
    layout: CommonLayout,
    isPrivate: false
  },
  {
    path: SCREEN_PATH.FORGOT_PASS,
    component: lazy(() => import('view/auth/ForgotPasswordView')),
    layout: CommonLayout,
    isPrivate: false
  },
  {
    path: SCREEN_PATH.CHANGE_PASS,
    component: lazy(() => import('view/auth/ChangePasswordView')),
    layout: CommonLayout,
    isPrivate: false
  },
  {
    path: SCREEN_PATH.VALID_EMAIL,
    component: lazy(() => import('view/auth/ConfirmValidEmailView')),
    layout: CommonLayout,
    isPrivate: false
  },
  {
    path: SCREEN_PATH.RESET_PASS,
    component: lazy(() => import('view/auth/ResetPasswordView')),
    layout: CommonLayout,
    isPrivate: false
  },
  {
    path: SCREEN_PATH.DETAIL + '/:id',
    component: lazy(() => import('view/DetailView')),
    layout: CommonLayout,
    isPrivate: true
  }
];

export const AppRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        {ROUTES.map((routeConfig, index) =>
          routeConfig.isPrivate ? (
            <Route
              key={index}
              exact
              path={routeConfig.path}
              element={<PrivateRoute {...routeConfig} />}
            />
          ) : (
            <Route
              key={index}
              exact
              path={routeConfig.path}
              element={<PublicRoute {...routeConfig} />}
            />
          )
        )}
      </Routes>
    </BrowserRouter>
  );
};
