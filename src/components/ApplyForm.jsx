import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';

import CountryDropdown from './CountryDropdown';
import Field from './Field';
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

  const renderField = ({
    name, label, helpText, isRequired,
    component, componentProps, registerProps,
  } = {}) => (
    <Field
      name={name}
      label={label}
      helpText={helpText}
      isRequired={isRequired}
      errors={errors}
      component={component}
      componentProps={componentProps}
      registerField={register}
      registerProps={registerProps}
    />
  );

  return (
    <GenericPage title={`Отклик на вакансию ${job.title}`}>
      <p>
        <Link to="/">&lt;- Все вакансии</Link> /{' '}
        <Link to={job.url}>{job.title}</Link>
      </p>
      <h1>Отклик на вакансию</h1>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        {renderField({
          name: 'fullName',
          label: 'Ваше имя и фамилия',
          componentProps: { autoFocus: true },
        })}
        {renderField({
          name: 'country',
          label: 'Страна проживания',
          component: CountryDropdown,
          registerProps: { validate: checkCountry },
        })}
        {renderField({
          name: 'city',
          label: 'Город или населенный пункт',
        })}
        {renderField({
          name: 'email',
          label: 'Ваш Email',
        })}
        {renderField({
          name: 'telegram',
          label: 'Telegram',
          isRequired: false,
        })}
        {renderField({
          name: 'skype',
          label: 'Skype',
          isRequired: false,
        })}
        {renderField({
          name: 'experienceOverall',
          label: 'Сколько у вас лет опыта в программировании?',
        })}
        {renderField({
          name: 'experienceWeb',
          label: 'Сколько из этих лет было связано с веб-разработкой?',
        })}
        {renderField({
          name: 'education',
          label: 'Какое у вас образование?',
          helpText: 'Учебное заведение, год окончания, специальность',
        })}
        {renderField({
          name: 'linuxCommands',
          label: 'Назовите консольные команды Linux, '
            + 'состоящих из 3 символов, сколько вспомните.',
          helpText: 'Подглядывать нечестно.',
        })}
        {renderField({
          name: 'lovedTasks',
          label: 'Какого рода задачами вам больше всего нравится заниматься?',
          helpText: 'Кто-то любит проектировать архитектуру, кто-то UI, '
            + 'кто-то заниматься исследованиями нового. То, что нравится, '
            + 'обычно делается легко и быстро.',
        })}
        {renderField({
          name: 'unlovedTasks',
          label: 'А чем не нравится заниматься?',
          helpText: 'Бывают вещи, от которых воротит, которые приходится '
            + 'делать через силу. Их не получется делать быстро или не '
            + 'получается делать совсем.',
        })}
        {renderField({
          name: 'sourceCode',
          label: 'Где можно посмотреть ваш код? GitHub, Bitbucket, иное.',
          helpText: 'Желательно ссылки на свои проекты, не форки.',
        })}
        {renderField({
          name: 'english',
          label: 'Как у вас с английским?',
          helpText: 'С письменным, с устным?',
        })}
        {renderField({
          name: 'referrer',
          label: 'Откуда вы узнали о вакансии?',
          helpText: 'Наименование сайта с объявлением / '
            + 'может, мы вам написали сами / или друзья прислали ссылку',
        })}
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
