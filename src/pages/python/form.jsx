import omit from 'lodash/omit';
import React from 'react';

import Jobs from '@/Jobs';
import DeveloperForm, { allExperienceTypes } from '@/components/DeveloperForm';
import Layout from '@/components/layout/Layout';

const backLink = { url: '/', text: 'Все вакансии' };

export default function PythonForm() {
  return (
    <Layout
      pageTitle="Отклик на вакансию"
      metaTitle={`Отклик на вакансию - ${Jobs.python.title}`}
      metaDescription={Jobs.python.description}
      backLink={backLink}
    >
      <DeveloperForm
        job={Jobs.python}
        experienceTypes={omit(allExperienceTypes, ['php'])}
      />
    </Layout>
  );
}
