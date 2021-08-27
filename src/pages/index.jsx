import React from 'react';

import Contacts from '@/components/Contacts';
import IndexText from '@/components/IndexText';
import IndexVacancies from '@/components/IndexVacancies';
import Layout from '@/components/layout/Layout';

import '../_global.scss';

const IndexPage = () => (
  <Layout pageTitle="Работа в Ivelum">
    <div className="row">
      <div className="col-lg-6 col-xl-5 offset-xl-1">
        <IndexText />
      </div>
      <div className="col-lg-6 col-xl-5 offset-xl-1">
        <Contacts />
      </div>
    </div>
    <div className="row justify-content-center">
      <div className="col-12 col-xl-10">
        <IndexVacancies />
      </div>
    </div>
  </Layout>
);

export default IndexPage;
