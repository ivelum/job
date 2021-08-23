import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';

import CountryDropdown from './CountryDropdown';
import FormErrorMessage from './FormErrorMessage';
import GenericPage from './GenericPage';

import * as styles from './ApplyForm.module.scss';

function checkCountry(value) {
  if (value === 'RU') {
    return 'Найм из России по этой вакансии временно приостановлен. '
      + 'У нас есть внутренние квоты по найму из разных стран, и квота по '
      + 'России на данный момент полностью выбрана. Это временная ситуация. '
      + 'Как только появятся квоты, мы возобновим найм в России.';
  }
  if (['AZ', 'CN', 'KZ', 'LV', 'UZ'].indexOf(value) >= 0) {
    return 'В настоящее время у нас нет возможности работать с этой страной';
  }
  return null;
}

export default function ApplyForm({ job }) {
  const { register, handleSubmit, formState: { errors } } = useForm();
  // eslint-disable-next-line no-console
  const onSubmit = (data) => console.log(data);

  return (
    <GenericPage title={`Отклик на вакансию ${job.title}`}>
      <p>
        <Link to="/">&lt;- Все вакансии</Link> /{' '}
        <Link to={job.url}>{job.title}</Link>
      </p>
      <h1>Отклик на вакансию</h1>

      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="fullName">
          Ваше имя и фамилия
          <span className={styles.required}>*</span>
        </label>
        <input
          {...register('fullName', {
            required: 'Обязательное поле',
          })}
          autoFocus // eslint-disable-line jsx-a11y/no-autofocus
          id="fullName"
        />
        <FormErrorMessage error={errors.fullName} />

        <label htmlFor="country">
          Страна проживания
          <span className={styles.required}>*</span>
        </label>
        <CountryDropdown
          {...register('country', {
            required: 'Обязательное поле',
            validate: checkCountry,
          })}
          id="country"
        />
        <FormErrorMessage error={errors.country} />

        <label htmlFor="city">
          Город или населенный пункт
          <span className={styles.required}>*</span>
        </label>
        <input
          {...register('city', {
            required: 'Обязательное поле',
          })}
          id="city"
        />
        <FormErrorMessage error={errors.city} />

        <button className={styles.submit} type="submit">Отправить</button>
      </form>
    </GenericPage>
  );
}

ApplyForm.propTypes = {
  job: PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};
