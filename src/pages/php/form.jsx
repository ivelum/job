import omit from 'lodash/omit';
import React from 'react';

import Jobs from '@/Jobs';
import DeveloperForm, { allExperienceTypes } from '@/components/DeveloperForm';
import Layout from '@/components/layout/Layout';

const backLink = { url: '/', text: 'Все вакансии' };

export default function PHPForm() {
  return (
    <Layout
      pageTitle="Отклик на вакансию"
      metaTitle={`Отклик на вакансию - ${Jobs.php.title}`}
      metaDescription={Jobs.php.description}
      backLink={backLink}
    >
      <DeveloperForm
        job={Jobs.php}
        experienceTypes={omit(allExperienceTypes, ['django'])}
      />
    </Layout>
  );
}
