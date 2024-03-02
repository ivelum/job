import React from 'react';

import Jobs from '@/Jobs';
import UXForm from '@/components/UXForm';
import Layout from '@/components/layout/Layout';

const backLink = { url: '/', text: 'Все вакансии' };

export default function UXApplicationForm() {
  return (
    <Layout
      pageTitle="Отклик на вакансию"
      metaTitle={`Отклик на вакансию - ${Jobs.ux.title}`}
      metaDescription={Jobs.ux.description}
      backLink={backLink}
    >
      <UXForm job={Jobs.ux} experienceTypes={{}} />
    </Layout>
  );
}
