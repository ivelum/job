import omit from 'lodash/omit';
import React from 'react';

import Jobs from '@/Jobs';
import ApplyForm, { allExperienceTypes } from '@/components/ApplyForm';
import Layout from '@/components/layout/Layout';

const backLink = { url: '/', text: 'Все вакансии' };

export default function FrontendForm() {
  return (
    <Layout
      pageTitle="Отклик на вакансию"
      metaTitle={`Отклик на вакансию - ${Jobs.frontend.title}`}
      metaDescription={Jobs.frontend.description}
      backLink={backLink}
    >
      <ApplyForm
        job={Jobs.frontend}
        experienceTypes={omit(allExperienceTypes, ['php', 'python', 'django'])}
        ruEnabled
      />
    </Layout>
  );
}
