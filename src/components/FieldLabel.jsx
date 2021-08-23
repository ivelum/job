import PropTypes from 'prop-types';
import React from 'react';

import * as styles from '@components/FieldLabel.module.scss';

export default function FieldLabel({
  name, label, helpText, isRequired,
}) {
  return (
    <>
      <label htmlFor={name}>
        {label}
        {isRequired && <span className={styles.required}>*</span>}
      </label>
      {helpText && <div className={styles.helpText}>{helpText}</div>}
    </>
  );
}

FieldLabel.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  helpText: PropTypes.string,
  isRequired: PropTypes.bool,
};

FieldLabel.defaultProps = {
  helpText: '',
  isRequired: true,
};
