import React from 'react';
import { Radio, Card, Button, Typography } from 'antd';
import { RadioChangeEvent } from 'antd/lib/radio';

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

const YesNoOptionCard: React.FC<Props> = (props): React.ReactElement => {
  const [open, setOpen] = React.useState(false);
  const onClick: ButtonOnClick = (e) => {
    setOpen(!open);
  };
  return (
    <Card
      style={{ width: '80%', marginBottom: '10px' }}
      size='small'
      title={props.title}
      extra={ExtraButton(onClick)}
    >
      {open && <div>{props.learnMore}</div>}
      <Radio.Group onChange={props.onChange} value={props.value}>
        <Radio value={true}>Yes</Radio>
        <Radio value={false}>No</Radio>
      </Radio.Group>
      {props.displayError && <Typography.Text type='danger'>This field is required!</Typography.Text>}
    </Card>
  );
};

export default YesNoOptionCard;
