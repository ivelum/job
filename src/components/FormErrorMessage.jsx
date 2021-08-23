import PropTypes from 'prop-types';
import React from 'react';

import * as styles from './FormErrorMessage.module.scss';

export default function FormErrorMessage({ error }) {
  return error && <div className={styles.error}>{error.message}</div>;
}

FormErrorMessage.propTypes = {
  error: PropTypes.object,
};

FormErrorMessage.defaultProps = {
  error: null,
};
