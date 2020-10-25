import * as React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { Form, Spin, Input, Button, notification, Col, Row } from 'antd';

// Presentational
import FormWrapper from '../components/styled/FormWrapper';

// App theme
import { colors } from '../themes/colors';

// App constants
import { AUTH_USER_TOKEN_KEY } from '../utils/constants';
import { LoadingOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import {
  CognitoUser,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';

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
                  console.log('logged in');
                  user.getUserAttributes((err, attributes) => {
                    if (err || !attributes) {
                      return;
                    }
                    const acceptedPrivacyPolicy = attributes.find(
                      (attribute) =>
                        attribute.getName() === 'custom:agreedPrivacy'
                    );
                    console.log('after logged in and inside callback - pushing new routes...')
                    if (
                      acceptedPrivacyPolicy &&
                      acceptedPrivacyPolicy.getValue() !== '0'
                    ) {
                      console.log('pushing config route...');
                      history.push({
                        pathname: '/privacy-config',
                        search: window.location.search
                      });
                      console.log('pushed config route');
                    } else {
                      console.log('pushing consent route...');
                      history.push({
                        pathname: '/privacy-consent',
                        search: window.location.search
                      });
                      console.log('pushed consent route');
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
            <Col lg={24}>
              <Button
                style={{ width: '100%' }}
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
            </Col>
            <Col lg={24}>
              Or <Link to='/signup'>register now!</Link>
            </Col>
          </Row>
        </Form.Item>
      </FormWrapper>
    </React.Fragment>
  );
};

export default LoginContainer;
