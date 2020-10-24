import React from 'react';

import { Button, Checkbox, Typography } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import CenterWrapper from '../components/styled/CenterWrapper';
import { RouteComponentProps } from 'react-router-dom';

const PrivacyPolicyConsentContainer: React.FC<RouteComponentProps> = (
  props
): React.ReactElement => {
  const [submitting, isSubmitting] = React.useState(false);
  const [checked, setChecked] = React.useState(false);

  const onCheckboxChange = (e: CheckboxChangeEvent) => {
    setChecked(e.target.checked);
  };

  const onAccept = () => {
    const { history } = props;
    history.push('privacy-config');
  };

  return (
    <CenterWrapper>
      <Typography.Title level={2}>Privacy Policy</Typography.Title>
      <Typography.Paragraph>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iusto quia
        eos, error praesentium perferendis maiores cumque! Molestias temporibus
        culpa eum velit nihil atque at? Fuga totam voluptates assumenda in
        recusandae? Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        Doloribus reiciendis reprehenderit rem nam expedita dolor. Nemo officia
        placeat maiores, ipsam odit quae explicabo beatae modi recusandae Lorem
        ipsum dolor, sit amet consectetur adipisicing elit. Iusto quia eos,
        error praesentium perferendis maiores cumque! Molestias temporibus culpa
        eum velit nihil atque at? Fuga totam voluptates assumenda in recusandae?
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus
        reiciendis reprehenderit rem nam expedita dolor. Nemo officia placeat
        maiores, ipsam odit quae explicabo beatae modi recusandae reprehenderit,
        deserunt cumque aut? eos, error praesentium perferendis maiores cumque!
        Molestias temporibus culpa eum velit nihil atque at? Fuga totam
        voluptates assumenda in recusandae? Lorem ipsum dolor, sit amet
        consectetur adipisicing elit. Doloribus reiciendis reprehenderit rem nam
        expedita dolor. Nemo officia placeat maiores, ipsam odit quae explicabo
        beatae modi recusandae reprehenderit, deserunt cumque aut? eos, error
        praesentium perferendis maiores cumque! Molestias temporibus culpa eum
        velit nihil atque at? Fuga totam voluptates assumenda in recusandae?
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus
        reiciendis reprehenderit rem nam expedita dolor. Nemo officia placeat
        maiores, ipsam odit quae explicabo beatae modi recusandae reprehenderit,
        deserunt cumque aut? eos, error praesentium perferendis maiores cumque!
        Molestias temporibus culpa eum velit nihil atque at? Fuga totam
        voluptates assumenda in recusandae? Lorem ipsum dolor, sit amet
        consectetur adipisicing elit. Doloribus reiciendis reprehenderit rem nam
        expedita dolor. Nemo officia placeat maiores, ipsam odit quae explicabo
        beatae modi recusandae reprehenderit, deserunt cumque aut?
        reprehenderit, deserunt cumque aut? Lorem ipsum dolor, sit amet
        consectetur adipisicing elit. Iusto quia eos, error praesentium
        perferendis maiores cumque! Molestias temporibus culpa eum velit nihil
        atque at? Fuga totam voluptates assumenda in recusandae? Lorem ipsum
        dolor, sit amet consectetur adipisicing elit. Doloribus reiciendis
        reprehenderit rem nam expedita dolor. Nemo officia placeat maiores,
        ipsam odit quae explicabo beatae modi recusandae reprehenderit, deserunt
        cumque aut? Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        Iusto quia eos, error praesentium perferendis maiores cumque! Molestias
        temporibus culpa eum velit nihil atque at? Fuga totam voluptates
        assumenda in recusandae? Lorem ipsum dolor, sit amet consectetur
        adipisicing elit. Doloribus reiciendis reprehenderit rem nam expedita
        dolor. Nemo officia placeat maiores, ipsam odit quae explicabo beatae
        modi recusandae Lorem ipsum dolor, sit amet consectetur adipisicing
        elit. Iusto quia eos, error praesentium perferendis maiores cumque!
        Molestias temporibus culpa eum velit nihil atque at? Fuga totam
        voluptates assumenda in recusandae? Lorem ipsum dolor, sit amet
        consectetur adipisicing elit. Doloribus reiciendis reprehenderit rem nam
        expedita dolor. Nemo officia placeat maiores, ipsam odit quae explicabo
        beatae modi recusandae reprehenderit, deserunt cumque aut? eos, error
        praesentium perferendis maiores cumque! Molestias temporibus culpa eum
        velit nihil atque at? Fuga totam voluptates assumenda in recusandae?
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus
        reiciendis reprehenderit rem nam expedita dolor. Nemo officia placeat
        maiores, ipsam odit quae explicabo beatae modi recusandae reprehenderit,
        deserunt cumque aut? eos, error praesentium perferendis maiores cumque!
        Molestias temporibus culpa eum velit nihil atque at? Fuga totam
        voluptates assumenda in recusandae? Lorem ipsum dolor, sit amet
        consectetur adipisicing elit. Doloribus reiciendis reprehenderit rem nam
        expedita dolor. Nemo officia placeat maiores, ipsam odit quae explicabo
        beatae modi recusandae reprehenderit, deserunt cumque aut? eos, error
        praesentium perferendis maiores cumque! Molestias temporibus culpa eum
        velit nihil atque at? Fuga totam voluptates assumenda in recusandae?
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus
        reiciendis reprehenderit rem nam expedita dolor. Nemo officia placeat
        maiores, ipsam odit quae explicabo beatae modi recusandae reprehenderit,
        deserunt cumque aut? reprehenderit, deserunt cumque aut? Lorem ipsum
        dolor, sit amet consectetur adipisicing elit. Iusto quia eos, error
        praesentium perferendis maiores cumque! Molestias temporibus culpa eum
        velit nihil atque at? Fuga totam voluptates assumenda in recusandae?
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus
        reiciendis reprehenderit rem nam expedita dolor. Nemo officia placeat
        maiores, ipsam odit quae explicabo beatae modi recusandae reprehenderit,
        deserunt cumque aut? Lorem ipsum dolor, sit amet consectetur adipisicing
        elit. Iusto quia eos, error praesentium perferendis maiores cumque!
        Molestias temporibus culpa eum velit nihil atque at? Fuga totam
        voluptates assumenda in recusandae? Lorem ipsum dolor, sit amet
        consectetur adipisicing elit. Doloribus reiciendis reprehenderit rem nam
        expedita dolor. Nemo officia placeat maiores, ipsam odit quae explicabo
        beatae modi recusandae Lorem ipsum dolor, sit amet consectetur
        adipisicing elit. Iusto quia eos, error praesentium perferendis maiores
        cumque! Molestias temporibus culpa eum velit nihil atque at? Fuga totam
        voluptates assumenda in recusandae? Lorem ipsum dolor, sit amet
        consectetur adipisicing elit. Doloribus reiciendis reprehenderit rem nam
        expedita dolor. Nemo officia placeat maiores, ipsam odit quae explicabo
        beatae modi recusandae reprehenderit, deserunt cumque aut? eos, error
        praesentium perferendis maiores cumque! Molestias temporibus culpa eum
        velit nihil atque at? Fuga totam voluptates assumenda in recusandae?
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus
        reiciendis reprehenderit rem nam expedita dolor. Nemo officia placeat
        maiores, ipsam odit quae explicabo beatae modi recusandae reprehenderit,
        deserunt cumque aut? eos, error praesentium perferendis maiores cumque!
        Molestias temporibus culpa eum velit nihil atque at? Fuga totam
        voluptates assumenda in recusandae? Lorem ipsum dolor, sit amet
        consectetur adipisicing elit. Doloribus reiciendis reprehenderit rem nam
        expedita dolor. Nemo officia placeat maiores, ipsam odit quae explicabo
        beatae modi recusandae reprehenderit, deserunt cumque aut? eos, error
        praesentium perferendis maiores cumque! Molestias temporibus culpa eum
        velit nihil atque at? Fuga totam voluptates assumenda in recusandae?
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus
        reiciendis reprehenderit rem nam expedita dolor. Nemo officia placeat
        maiores, ipsam odit quae explicabo beatae modi recusandae reprehenderit,
        deserunt cumque aut? reprehenderit, deserunt cumque aut? Lorem ipsum
        dolor, sit amet consectetur adipisicing elit. Iusto quia eos, error
        praesentium perferendis maiores cumque! Molestias temporibus culpa eum
        velit nihil atque at? Fuga totam voluptates assumenda in recusandae?
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus
        reiciendis reprehenderit rem nam expedita dolor. Nemo officia placeat
        maiores, ipsam odit quae explicabo beatae modi recusandae reprehenderit,
        deserunt cumque aut?
      </Typography.Paragraph>
      <Checkbox checked={checked} onChange={onCheckboxChange}>
        I agree with the terms and conditions.
      </Checkbox>
      <Button onClick={onAccept} disabled={!checked} block type='primary'>
        I Accept
      </Button>
    </CenterWrapper>
  );
};

export default PrivacyPolicyConsentContainer;
