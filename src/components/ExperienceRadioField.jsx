import range from 'lodash/range';
import PropTypes from 'prop-types';
import React from 'react';

import FormErrorMessage from '@components/FormErrorMessage';

import * as styles from './ExperienceRadioField.module.scss';

export const allExperienceTypes = {
  linux: 'Linux',
  php: 'PHP',
  python: 'Python',
  django: 'Django',
  db: 'Реляционные БД',
  frontend: 'Фронтенд-разработка',
  tests: 'Автоматизированное тестирование',
  requirements: 'Сбор и формализация требований',
};

export default function ExperienceRadioField({ name, errors, register }) {
  const label = allExperienceTypes[name];
  const fullName = `experience${name}`;
  return (
    <div
      className={styles.row}
      {...register(fullName, {
        required: 'Обязательное поле',
      })}
    >
      <div className={styles.label}>
        {label}
      </div>
      {(range(0, 5).map((level) => (
        <div key={`${fullName}-${level}`} className={styles.button}>
          <label htmlFor={`${fullName}-${level}`}>{level}</label>
          <input
            type="radio"
            id={`${fullName}-${level}`}
            name={fullName}
            value={level}
          />
        </div>
      )))}
      <FormErrorMessage error={errors && errors[fullName]} />
    </div>
  );
}

ExperienceRadioField.propTypes = {
  name: PropTypes.string.isRequired,
  errors: PropTypes.object,
  register: PropTypes.func.isRequired,
};

ExperienceRadioField.defaultProps = {
  errors: null,
};
