import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

/** Container components */
// import DashBoardContainer from '../containers/DashboardContainer';
import LoginContainer from '../containers/LoginContainer';
import SignUpContainer from '../containers/SignUpContainer';
import ConfirmEmailContainer from '../containers/ConfirmEmailContainer';
import PrivacyPolicyConsentContainer from '../containers/PrivacyPolicyConsentContainer';
import PrivacyConfigContainer from '../containers/PrivacyConfigContainer';

/** private route component */
import PrivateRoute from './PrivateRoute';

class AppRouter extends React.Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Route
            exact
            path='/privacy-consent'
            component={PrivacyPolicyConsentContainer}
          />
          <Route
            exact
            path='/privacy-config'
            component={PrivacyConfigContainer}
            />
          <Route exact={true} path='/' component={LoginContainer} />
          <Route exact={true} path='/login' component={LoginContainer} />
          <Route exact={true} path='/signup' component={SignUpContainer} />
          <Route
            exact={true}
            path='/verify-code'
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
