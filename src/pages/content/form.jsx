import React from 'react';

import Jobs from '@/Jobs';
import ContentForm from '@/components/ContentForm';
import Layout from '@/components/layout/Layout';

const backLink = { url: '/', text: 'Все вакансии' };

export default function HeadOfMarketingForm() {
  return (
    <Layout
      pageTitle="Отклик на вакансию"
      metaTitle={`Отклик на вакансию - ${Jobs.content.title}`}
      metaDescription={Jobs.content.description}
      backLink={backLink}
    >
      <ContentForm
        job={Jobs.content}
        experienceTypes={{}}
      />
    </Layout>
  );
}
