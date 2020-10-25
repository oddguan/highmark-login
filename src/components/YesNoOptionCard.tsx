import React from 'react';
import { Radio, Card, Button, Typography } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';
import styled from 'styled-components';

type Props = {
  onChange: (e: RadioChangeEvent) => void;
  value: boolean | null;
  title: string;
  learnMore: string;
  displayError: boolean;
};

type ButtonOnClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;

const ExtraButton = (onClick: ButtonOnClick) => (
  <Button onClick={onClick} type='primary'>
    Learn More
  </Button>
);

const LearnMoreText = styled.div`
  border: 1px solid #eee;
  padding: 5px;
`;

const YesNoOptionCard: React.FC<Props> = (props): React.ReactElement => {
  const [open, setOpen] = React.useState(false);
  const onClick: ButtonOnClick = (e) => {
    setOpen(!open);
  };
  return (
    <Card
      style={{ width: '100%', marginBottom: '10px' }}
      size='small'
      title={props.title}
      extra={ExtraButton(onClick)}
    >
      {open && <LearnMoreText>{props.learnMore}</LearnMoreText>}
      <Radio.Group onChange={props.onChange} value={props.value}>
        <Radio value={true}>Yes</Radio>
        <Radio value={false}>No</Radio>
      </Radio.Group>
      {props.displayError && <Typography.Text type='danger'>This field is required!</Typography.Text>}
    </Card>
  );
};

export default YesNoOptionCard;
