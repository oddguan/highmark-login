import * as React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import {
  Form,
  Input,
  Button,
  notification,
  Spin,
  Col,
  Row,
} from 'antd';
import {
  LoadingOutlined,
  LockOutlined,
  PhoneOutlined,
  UserOutlined,
} from '@ant-design/icons';

/** Presentational */
import FormWrapper from '../components/styled/FormWrapper';

/** App theme */
import { colors } from '../themes/colors';
import { SIGN_IN_ROUTE } from '../utils/constants';

type Props = {
  form: any;
};

type State = {
  confirmDirty: boolean;
  redirect: boolean;
  loading: boolean;
  email: string;
};

type UserFormData = {
  fname: string;
  lname: string;
  password: string;
  email: string;
  phoneNumber: number;
};

const passwordValidator = require('password-validator');

// create a password schema
const schema = new passwordValidator();

schema
  .is()
  .min(8)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits()
  .has()
  .symbols();

const SignUpContainer: React.FC<Props> = (props): React.ReactElement => {
  const [state, setState] = React.useState({
    confirmDirty: false,
    redirect: false,
    loading: false,
    email: '',
  });
  const [form] = Form.useForm();

  const handleFinish = () => {
    form.validateFields().then((values) => {
      console.log('values: ', values);
      let { fname, lname, password, email, phoneNumber } = values;

      // show loader
      setState({ ...state, loading: true });

      Auth.signUp({
        username: email,
        password,
        attributes: {
          email,
          name: `${fname} ${lname}`,
          phone_number: phoneNumber,
        },
      })
        .then(() => {
          notification.success({
            message: 'Succesfully signed up user!',
            description:
              'Account created successfully, Redirecting you in a few!',
            placement: 'topRight',
            duration: 1.5,
            onClose: () => {
              setState({ ...state, redirect: true });
            },
          });

          setState({ ...state, email });
        })
        .catch((err: Error) => {
          notification.error({
            message: 'Error',
            description: err.message,
            placement: 'topRight',
            duration: 1.5,
          });

          setState({
            ...state,
            loading: false,
          });
        });
    }).catch((err) => {
      console.error(err);
    });
  };

  return (
    <React.Fragment>
      <FormWrapper onFinish={handleFinish} form={form}>
        <Form.Item
          name='fname'
          label='fname'
          rules={[{ required: true, message: 'Please input your first name!' }]}
        >
          <Input
            prefix={<UserOutlined style={{ color: colors.transparentBlack }} />}
            placeholder='First Name'
          />
        </Form.Item>
        <Form.Item
          name='lname'
          label='lname'
          rules={[
            {
              required: true,
              message: 'Please input your last name!',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined style={{ color: colors.transparentBlack }} />}
            placeholder='Last Name'
          />
        </Form.Item>
        <Form.Item
          name='email'
          label='email'
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input
            prefix={<UserOutlined style={{ color: colors.transparentBlack }} />}
            placeholder='Email'
          />
        </Form.Item>
        <Form.Item
          name='phoneNumber'
          label='phoneNumber'
          rules={[
            {
              required: true,
              message: 'Please input your phone number!',
            },
          ]}
        >
          <Input
            prefix={
              <PhoneOutlined style={{ color: colors.transparentBlack }} />
            }
            placeholder='Phone Number'
          />
        </Form.Item>
        <Form.Item
          name='password'
          label='password'
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          {/* <Popover
              placement='right'
              title={title}
              content={passwordPolicyContent}
              trigger='focus'
            > */}
          <Input.Password
            prefix={<LockOutlined style={{ color: colors.transparentBlack }} />}
            placeholder='Password'
          />
          {/* </Popover> */}
        </Form.Item>

        <Form.Item className='text-center'>
          <Row>
            <Col lg={24}>
              <Button
                style={{ width: '100%' }}
                type='primary'
                disabled={state.loading}
                htmlType='submit'
              >
                {state.loading ? (
                  <Spin
                    indicator={<LoadingOutlined style={{ fontSize: 24 }} />}
                  />
                ) : (
                  'Register'
                )}
              </Button>
            </Col>
            <Col lg={24}>
              Or <Link to={SIGN_IN_ROUTE}>login to your account!</Link>
            </Col>
          </Row>
        </Form.Item>
      </FormWrapper>
      {state.redirect && (
        <Redirect
          to={{
            pathname: '/verify-code',
            search: `?email=${state.email}`,
          }}
        />
      )}
    </React.Fragment>
  );
};

export default SignUpContainer;
