import React from 'react';

import { Auth } from 'aws-amplify';

import { Typography, Button } from 'antd';

import CenterWrapper from '../components/styled/CenterWrapper';
import YesNoOptionCard from '../components/YesNoOptionCard';
import { RouteComponentProps } from 'react-router-dom';
import { CognitoUser } from 'amazon-cognito-identity-js';

export type Option = {
  name: string;
  learnMore: string;
  state: boolean | null;
  error: boolean;
};

const initialOptions: Option[] = [
  {
    name: 'Option 1',
    learnMore:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum enim explicabo vitae repellat. Fugiat ut laborum temporibus ipsam, placeat cumque est dolores deleniti, in dolorem inventore quibusdam explicabo? Impedit, nesciunt?',
    state: null,
    error: false,
  },
  {
    name: 'Option 2',
    learnMore:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum enim explicabo vitae repellat. Fugiat ut laborum temporibus ipsam, placeat cumque est dolores deleniti, in dolorem inventore quibusdam explicabo? Impedit, nesciunt?',
    state: null,
    error: false,
  },
  {
    name: 'Option asdglkj salkdjg alskjg lsakjg laskdgj lasgj lsakdgjlaksgjlsakjgklsa jl',
    learnMore:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum enim explicabo vitae repellat. Fugiat ut laborum temporibus ipsam, placeat cumque est dolores deleniti, in dolorem inventore quibusdam explicabo? Impedit, nesciunt?',
    state: null,
    error: false,
  },
];

const PrivacyConfigContainer: React.FC<RouteComponentProps> = ({ history }): React.ReactElement => {
  const [options, setOptions] = React.useState(initialOptions);

  const onSubmit = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    const newOptions = [...options];
    let atLeastOneError = false;
    for (const option of newOptions) {
      if (option.state === null) {
        option.error = true;
        atLeastOneError = true;
      }
    }
    setOptions(newOptions);
    if (atLeastOneError) {
      return;
    }
    // TODO: go to next page
  };

  return (
    <CenterWrapper>
      <Typography.Title level={2}>
        Configure Privacy Preferences
      </Typography.Title>
      {options.map((option, i) => (
        <YesNoOptionCard
          key={option.name}
          onChange={(e) => {
            const newOptions = [...options];
            newOptions[i].state = e.target.value;
            newOptions[i].error = false;
            setOptions(newOptions);
          }}
          title={option.name}
          value={option.state}
          learnMore={option.learnMore}
          displayError={option.error}
        />
      ))}
      <Button block onClick={onSubmit} type='primary'>Submit</Button>
    </CenterWrapper>
  );
};

export default PrivacyConfigContainer;
