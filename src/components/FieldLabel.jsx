import PropTypes from 'prop-types';
import React from 'react';

import * as styles from '@components/FieldLabel.module.scss';

export default function FieldLabel({
  name, label, isRequired,
}) {
  return (
    <>
      <label htmlFor={name}>
        {label}
        {isRequired && <span className={styles.required}> *</span>}
      </label>
    </>
  );
}

FieldLabel.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
};

FieldLabel.defaultProps = {
  isRequired: true,
};
