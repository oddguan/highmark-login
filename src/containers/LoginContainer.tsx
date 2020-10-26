import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { Form, Spin, Image, Input, Button, notification, Col, Row } from 'antd';

// Presentational
import FormWrapper from '../components/styled/FormWrapper';

// App theme
import { colors } from '../themes/colors';

// App constants
import {
  AUTH_USER_TOKEN_KEY,
  PRIVACY_CONFIGURE_ROUTE,
  PRIVACY_POLICY_ROUTE,
  SIGN_UP_ROUTE,
} from '../utils/constants';
import { LoadingOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import { CognitoUser, CognitoUserSession } from 'amazon-cognito-identity-js';

type Props = RouteComponentProps<any> & {
  form: any;
};

const LoginContainer: React.FC<Props> = (props): React.ReactElement => {
  const [loading, setLoading] = React.useState(false);
  const [form] = Form.useForm();
  const handleFinish = () => {
    form
      .validateFields()
      .then((values) => {
        let { username, password } = values;
        setLoading(true);

        Auth.signIn(username, password)
          .then((user: CognitoUser) => {
            const { history } = props;
            user.getSession(
              (err: Error | null, session: CognitoUserSession) => {
                if (!err) {
                  const jwtToken = session.getAccessToken().getJwtToken();
                  localStorage.setItem(AUTH_USER_TOKEN_KEY, jwtToken);

                  notification.success({
                    message: 'Succesfully logged in!',
                    description:
                      'Logged in successfully, Redirecting you in a few!',
                    placement: 'topRight',
                    duration: 1.5,
                  });
                  if (process.env.NODE_ENV === 'development') {
                    // if dev, always go to policy page
                    history.push(PRIVACY_POLICY_ROUTE);
                    return;
                  }
                  user.getUserAttributes((err, attributes) => {
                    if (err || !attributes) {
                      return;
                    }
                    const acceptedPrivacyPolicy = attributes.find(
                      (attribute) =>
                        attribute.getName() === 'custom:agreedPrivacy'
                    );
                    if (
                      acceptedPrivacyPolicy &&
                      acceptedPrivacyPolicy.getValue() !== '0'
                    ) {
                      history.push({
                        pathname: PRIVACY_CONFIGURE_ROUTE,
                        search: window.location.search,
                      });
                    } else {
                      history.push({
                        pathname: PRIVACY_POLICY_ROUTE,
                        search: window.location.search,
                      });
                    }
                  });
                }
              }
            );
          })
          .catch((err) => {
            notification.error({
              message: 'Error',
              description: err.message,
              placement: 'topRight',
            });

            console.log(err);

            setLoading(false);
          });
      })
      .catch((err: Error) => {
        console.error(err);
      });
  };
  return (
    <React.Fragment>
      <FormWrapper form={form} onFinish={handleFinish} className='login-form'>
        <div style={{ textAlign: 'center' }}>
          <Image
            width={200}
            src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmma.prnewswire.com%2Fmedia%2F701788%2FHighmark_Health_Logo.jpg'
          />
          <Image
            width={120}
            src='https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fstorage.googleapis.com%2Fmesmerizing-matrix-1380%2F1%2F2018%2F07%2Famazon-alexa-transparent-logo.png'
          />
        </div>
        <Form.Item
          name='username'
          label='username'
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined style={{ color: colors.transparentBlack }} />}
            placeholder='Username'
          />
        </Form.Item>
        <Form.Item
          name='password'
          label='password'
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined style={{ color: colors.transparentBlack }} />}
            placeholder='Password'
          />
        </Form.Item>
        <Form.Item className='text-center'>
          <Row gutter={16}>
            <Col lg={24}>
              <Link
                style={{ float: 'right' }}
                className='login-form-forgot'
                to='/forgot-password'
              >
                Forgot password
              </Link>
            </Col>
              <Button
                block
                type='primary'
                disabled={loading}
                htmlType='submit'
                className='login-form-button'
              >
                {loading ? (
                  <Spin
                    indicator={
                      <LoadingOutlined style={{ fontSize: 24 }} spin />
                    }
                  />
                ) : (
                  'Log in'
                )}
              </Button>
            <Col lg={24}>
              Or <Link to={SIGN_UP_ROUTE}>register now!</Link>
            </Col>
          </Row>
        </Form.Item>
      </FormWrapper>
    </React.Fragment>
  );
};

export default LoginContainer;
