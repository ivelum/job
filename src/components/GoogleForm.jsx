import PropTypes from 'prop-types';
import React from 'react';

import * as styles from './GoogleForm.module.css';

export default function GoogleForm({ job: { formId } }) {
  return (
    <div className={styles.wrapper}>
      <iframe
        className={styles.frame}
        title="Google Form"
        src={`https://docs.google.com/forms/${formId}/viewform?embedded=true`}
      />
    </div>
  );
}

GoogleForm.propTypes = {
  job: PropTypes.shape({
    formId: PropTypes.string.isRequired,
  }).isRequired,
};
