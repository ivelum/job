import omit from 'lodash/omit';
import React from 'react';

import Jobs from '../../Jobs';
import ApplyForm, { allExperienceTypes } from '@components/ApplyForm';

export default function PHPForm() {
  return (
    <ApplyForm
      job={Jobs.php}
      experienceTypes={omit(allExperienceTypes, ['django'])}
    />
  );
}
