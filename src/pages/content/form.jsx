import React from 'react';

import Jobs from '@/Jobs';
import MarketingForm from '@/components/MarketingForm';
import Layout from '@/components/layout/Layout';

const backLink = { url: '/', text: 'Все вакансии' };

export default function HeadOfMarketingForm() {
  return (
    <Layout
      pageTitle="Отклик на вакансию"
      metaTitle={`Отклик на вакансию - ${Jobs.marketing.title}`}
      metaDescription={Jobs.marketing.description}
      backLink={backLink}
    >
      <MarketingForm
        job={Jobs.marketing}
        experienceTypes={{}}
      />
    </Layout>
  );
}
