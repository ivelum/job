import PropTypes from 'prop-types';
import React from 'react';

import * as styles from '@components/Field.module.scss';
import FormErrorMessage from '@components/FormErrorMessage';

export default function Field({
  name, label, helpText, isRequired, errors,
  component, componentProps,
  registerField, registerProps,
}) {
  const Component = component;
  const registerValues = { ...registerProps };
  if (isRequired) {
    registerValues.required = 'Обязательное поле';
  }
  return (
    <>
      <label htmlFor={name}>
        {label}
        {isRequired && <span className={styles.required}>*</span>}
      </label>
      {helpText && <div className={styles.helpText}>{helpText}</div>}
      <Component
        {...registerField(name, registerValues)}
        {...componentProps}
        id={name}
      />
      <FormErrorMessage error={errors && errors[name]} />
    </>
  );
}

Field.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  helpText: PropTypes.string,
  isRequired: PropTypes.bool,
  errors: PropTypes.object,
  component: PropTypes.elementType,
  componentProps: PropTypes.object,
  registerField: PropTypes.func.isRequired,
  registerProps: PropTypes.object,
};

Field.defaultProps = {
  helpText: '',
  isRequired: true,
  errors: null,
  component: 'input',
  componentProps: {},
  registerProps: {},
};
