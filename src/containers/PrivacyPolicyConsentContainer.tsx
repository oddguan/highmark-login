import React from 'react';

import { Button, Checkbox, Spin, Typography } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import CenterWrapper from '../components/styled/CenterWrapper';
import { RouteComponentProps } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { CognitoUser } from 'amazon-cognito-identity-js';

import PrivacyPolicy from '../PrivacyPolicy';
import { PRIVACY_CONFIGURE_ROUTE } from '../utils/constants';
import { LoadingOutlined } from '@ant-design/icons';

const PrivacyPolicyConsentContainer: React.FC<RouteComponentProps> = (
  props
): React.ReactElement => {
  const [submitting, setSubmitting] = React.useState(false);
  const [checked, setChecked] = React.useState(false);

  const onCheckboxChange = (e: CheckboxChangeEvent) => {
    setChecked(e.target.checked);
  };

  const onAccept = async () => {
    setSubmitting(true);
    const user = (await Auth.currentAuthenticatedUser()) as CognitoUser;
    const newAttributes = [{ Name: 'custom:agreedPrivacy', Value: '1' }];
    user.updateAttributes(newAttributes, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      const { history } = props;
      history.push({
        pathname: PRIVACY_CONFIGURE_ROUTE,
        search: window.location.search,
      });
    });
  };

  return (
    <CenterWrapper>
      <Typography.Title level={2}>Privacy Policy</Typography.Title>
      <Typography.Paragraph>{PrivacyPolicy}</Typography.Paragraph>
      <Checkbox checked={checked} onChange={onCheckboxChange}>
        I agree with the terms and conditions.
      </Checkbox>
      <Button
        onClick={onAccept}
        disabled={!checked && !submitting}
        block
        type='primary'
      >
        {submitting ? (
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        ) : (
          'I Accept'
        )}
      </Button>
    </CenterWrapper>
  );
};

export default PrivacyPolicyConsentContainer;
