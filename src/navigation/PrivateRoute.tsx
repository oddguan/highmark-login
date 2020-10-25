import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { validateToken } from '../utils/helpers';

/** Constants */
import { AUTH_USER_TOKEN_KEY } from '../utils/constants';

const PrivateRoute = ({
  component: Component,
  ...rest
}: any & { component: any }) => {
  console.log('enter private route');
  const checkUserAuth = validateToken(
    localStorage.getItem(AUTH_USER_TOKEN_KEY)
  );
  console.log('checkedUserAuth: ', checkUserAuth);
  return (
    <Route
      {...rest}
      render={(props) => {
        return checkUserAuth ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
            }}
          />
        );
      }}
    />
  );
};

export default PrivateRoute;
