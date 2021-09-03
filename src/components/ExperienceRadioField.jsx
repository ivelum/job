import range from 'lodash/range';
import PropTypes from 'prop-types';
import React from 'react';

import * as styles from './ExperienceRadioField.module.scss';

import FormErrorMessage from '@/components/FormErrorMessage';

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
    <>
      <div className={styles.name}>
        {label}
        <FormErrorMessage error={errors && errors[fullName]} />
      </div>
      <div className={styles.range}>
        {(range(0, 5).map((level) => (
          <div key={`${fullName}-${level}`} className={styles.button}>
            <input
              type="radio"
              id={`${fullName}-${level}`}
              name={fullName}
              value={level}
              className={styles.input}
              {...register(fullName)}
            />
            <label
              htmlFor={`${fullName}-${level}`}
              className={styles.label}
            >
              <span>{level}</span>
            </label>
          </div>
        )))}
      </div>
    </>
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
