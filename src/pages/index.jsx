import React from 'react';

import Contacts from '@components/Contacts';
import IndexText from '@components/IndexText';
import IndexVacancies from '@components/IndexVacancies';
import Layout from '@components/layout/Layout';

import '../_global.scss';

const IndexPage = () => (
  <Layout pageTitle="Работа в Ivelum">
    <div className="row">
      <div className="col-5 offset-1">
        <IndexText />
      </div>
      <div className="col-5 offset-1">
        <Contacts />
      </div>
    </div>
    <div className="row">
      <div className="col-10 offset-1">
        <IndexVacancies />
      </div>
    </div>
  </Layout>
);

export default IndexPage;
