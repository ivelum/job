import omit from 'lodash/omit';
import React from 'react';

import Jobs from '../../Jobs';
import ApplyForm, { allExperienceTypes } from '@components/ApplyForm';

export default function PythonForm() {
  return (
    <ApplyForm
      job={Jobs.python}
      experienceTypes={omit(allExperienceTypes, ['php'])}
    />
  );
}
