import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { validateToken } from '../utils/helpers';

/** Constants */
import { AUTH_USER_TOKEN_KEY } from '../utils/constants';

const PrivateRoute = ({
  component: Component,
  ...rest
}: any & { component: any }) => {
  React.useEffect(() => {
    console.log('PrivateRoute componentDidMount');
  }, []);

  const jwtToken = localStorage.getItem(AUTH_USER_TOKEN_KEY);
  const checkUserAuth = validateToken(jwtToken);
  return (
    <Route
      {...rest}
      render={(props) => {
        return checkUserAuth ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/',
            }}
          />
        );
      }}
    />
  );
};

export default PrivateRoute;
