import PropTypes from 'prop-types';
import React from 'react';

import * as styles from './GoogleForm.module.css';

export default function GoogleForm({ formId }) {
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
  formId: PropTypes.string.isRequired,
};
