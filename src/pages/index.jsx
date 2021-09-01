import React from 'react';

import Contacts from '@/components/Contacts';
import IndexVacancies from '@/components/IndexVacancies';
import Row from '@/components/Row';
import WelcomeText from '@/components/WelcomeText';
import Layout from '@/components/layout/Layout';

import '../_global.scss';

export default function IndexPage() {
  return (
    <Layout pageTitle="Работа в Ivelum">
      <Row>
        <WelcomeText />
        <Contacts />
      </Row>
      <IndexVacancies />
    </Layout>
  );
}
