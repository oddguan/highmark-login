import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

/** Container components */
// import DashBoardContainer from '../containers/DashboardContainer';
import LoginContainer from '../containers/LoginContainer';
import SignUpContainer from '../containers/SignUpContainer';
import ConfirmEmailContainer from '../containers/ConfirmEmailContainer';
import PrivacyPolicyConsentContainer from '../containers/PrivacyPolicyConsentContainer';
import PrivacyConfigContainer from '../containers/PrivacyConfigContainer';
import { PRIVACY_CONFIGURE_ROUTE, PRIVACY_POLICY_ROUTE, SIGN_IN_ROUTE, SIGN_UP_ROUTE, VERIFY_EMAIL_ROUTE } from '../utils/constants';

/** private route component */
// import PrivateRoute from './PrivateRoute';

class AppRouter extends React.Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Route
            exact
            path={PRIVACY_POLICY_ROUTE}
            component={PrivacyPolicyConsentContainer}
          />
          <Route
            exact
            path={PRIVACY_CONFIGURE_ROUTE}
            component={PrivacyConfigContainer}
            />
          <Route exact={true} path={SIGN_IN_ROUTE} component={LoginContainer} />
          <Route exact={true} path={SIGN_IN_ROUTE} component={LoginContainer} />
          <Route exact={true} path={SIGN_UP_ROUTE} component={SignUpContainer} />
          <Route
            exact={true}
            path={VERIFY_EMAIL_ROUTE}
            component={ConfirmEmailContainer}
          />
          {/* <Route
            exact={true}
            path='/reset-password'
            component={PasswordResetContainer}
          />
          <Route
            exact={true}
            path='/forgot-password'
            component={ForgotPasswordContainer}
          /> */}
        </React.Fragment>
      </Router>
    );
  }
}

export default AppRouter;
