import * as React from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { Spin, Button, Form, notification, Input, Col } from 'antd';

// amplify
import { Auth } from 'aws-amplify';

// Presentational
import FullWidthWrapper from '../components/styled/FullWidthWrapper';
import EmailConfirmFormWrapper from '../components/styled/EmailConfirmFormWrapper';
import { LoadingOutlined } from '@ant-design/icons';
import { SIGN_IN_ROUTE } from '../utils/constants';

type State = {
  loading: boolean;
  redirect: boolean;
  error: string;
};

const ConfirmEmailContainer: React.FC<RouteComponentProps> = (
  props
): React.ReactElement => {
  const initialState: State = {
    loading: false,
    redirect: false,
    error: '',
  };
  const [username, setUsername] = React.useState('');
  const [confirmationCode, setConfirmationCode] = React.useState('');
  const [state, setState] = React.useState(initialState);

  React.useEffect(() => {
    if (props.location.search) {
      let username = props.location.search.split('=')[1];
      setUsername(username);
    }
  }, [props.location.search]);
  const handleFinish = () => {
    // show progress spinner
    setState({ ...state, loading: true });

    Auth.confirmSignUp(username, confirmationCode)
      .then(() => {
        handleOpenNotification(
          'success',
          'Succesfully confirmed!',
          'You will be redirected to login in a few!'
        );
      })
      .catch((err) => {
        handleOpenNotification('error', 'Invalid code', err.message);
        setState({
          ...state,
          loading: false,
        });
      });
  };

  const handleOpenNotification = (
    type: string,
    title: string,
    message: string
  ): void => {
    switch (type) {
      case 'success':
        notification['success']({
          message: title,
          description: message,
          placement: 'topRight',
          duration: 1.5,
          onClose: () => {
            setState({ ...state, redirect: true });
          },
        });
        break;

      case 'error':
        notification['error']({
          message: title,
          description: message,
          placement: 'topRight',
          duration: 1.5,
        });
        break;
    }
  };

  const handleOnPaste = (event: React.ClipboardEvent) => {
    event.preventDefault();

    let code = event.clipboardData.getData('Text').trim();

    /** Update input */
    setConfirmationCode(code);

    // regex to check if string is numbers only
    const reg = new RegExp('^[0-9]+$');

    if (reg.test(code) && code.length === 6) {
      // code is a valid number

      setState({ ...state, loading: true });

      Auth.confirmSignUp(username, code)
        .then(() => {
          handleOpenNotification(
            'success',
            'Succesfully confirmed!',
            'You will be redirected to login in a few!'
          );
        })
        .catch((err) => {
          handleOpenNotification('error', 'Invalid code', err.message);
          setState({
            ...state,
            loading: false,
          });
        });
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmationCode(event.currentTarget.value);
  };

  return (
    <FullWidthWrapper align='center'>
      <EmailConfirmFormWrapper onFinish={handleFinish}>
        <Col md={24} lg={18}>
          <div className='full-width'>
            <h2>Check your email</h2>
            <p>We've sent a six­ digit confirmation code</p>
          </div>
          <Form.Item
            validateStatus={state.error && 'error'}
            help={state.error}
            label='Confirmation Code'
          >
            <Input
              size='large'
              type='number'
              placeholder='Enter confirmation code'
              onChange={handleChange}
              onPaste={handleOnPaste}
              value={confirmationCode}
            />
          </Form.Item>
        </Col>
        <Col md={24} lg={12}>
          <Button
            type='primary'
            disabled={state.loading}
            htmlType='submit'
            size='large'
          >
            {state.loading ? (
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
              />
            ) : (
              'Confirm Email'
            )}
          </Button>
        </Col>
      </EmailConfirmFormWrapper>
      {state.redirect && <Redirect to={{ pathname: SIGN_IN_ROUTE }} />}
    </FullWidthWrapper>
  );
};

export default ConfirmEmailContainer;
