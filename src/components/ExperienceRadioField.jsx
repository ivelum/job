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
    <>
      <div className={`col-5 ${styles.expName}`}>
        {label}
        <FormErrorMessage error={errors && errors[fullName]} />
      </div>
      <div className="col-7">
        <div className={styles.expRange}>
          {(range(0, 5).map((level) => (
            <div key={`${fullName}-${level}`} className={styles.expButton}>
              <input
                type="radio"
                id={`${fullName}-${level}`}
                name={fullName}
                value={level}
                className={styles.expInput}
                {...register(fullName, { required: 'Обязательное поле' })}
              />
              <label
                htmlFor={`${fullName}-${level}`}
                className={styles.expLabel}
              >
                <span>{level}</span>
              </label>
            </div>
          )))}
        </div>
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
