import omit from 'lodash/omit';
import React from 'react';

import Jobs from '@/Jobs';
import DeveloperForm, { allExperienceTypes } from '@/components/DeveloperForm';
import Layout from '@/components/layout/Layout';

const backLink = { url: '/', text: 'Все вакансии' };

export default function WordPressForm() {
  return (
    <Layout
      pageTitle="Отклик на вакансию"
      metaTitle={`Отклик на вакансию - ${Jobs.wordpress.title}`}
      metaDescription={Jobs.wordpress.description}
      backLink={backLink}
    >
      <DeveloperForm
        job={Jobs.wordpress}
        experienceTypes={omit(allExperienceTypes, ['django'])}
      />
    </Layout>
  );
}
