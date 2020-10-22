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

type Props = RouteComponentProps<any> & {
  form: any;
};

type State = {
  loading: boolean;
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
          .then((user) => {
            const { history } = props;

            localStorage.setItem(
              AUTH_USER_TOKEN_KEY,
              user.signInUserSession.accessToken.jwtToken
            );

            notification.success({
              message: 'Succesfully logged in!',
              description: 'Logged in successfully, Redirecting you in a few!',
              placement: 'topRight',
              duration: 1.5,
            });

            const urlParams = new URLSearchParams(window.location.search);
            const redirectUrl = urlParams.get('redirect_url');

            if (redirectUrl) {
              history.push({
                pathname: redirectUrl,
              });
            }
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
