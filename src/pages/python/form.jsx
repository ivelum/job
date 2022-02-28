import omit from 'lodash/omit';
import React from 'react';

import Jobs from '@/Jobs';
import ApplyForm, { allExperienceTypes } from '@/components/ApplyForm';
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
      <ApplyForm
        job={Jobs.python}
        experienceTypes={omit(allExperienceTypes, ['php'])}
      />
    </Layout>
  );
}
