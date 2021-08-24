import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import CountryDropdown from './CountryDropdown';
import ExperienceRadioField, {
  allExperienceTypes,
} from './ExperienceRadioField';
import Field from './Field';
import FieldLabel from './FieldLabel';
import GenericPage from './GenericPage';
import FormErrorMessage from '@components/FormErrorMessage';

import * as styles from './ApplyForm.module.scss';

export { allExperienceTypes };

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

const apiUrl = 'https://1jlrn8msi3.execute-api.eu-north-1.amazonaws.com/';

const submitData = async (data) => {
  const response = await fetch(apiUrl, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return response.json();
};

export default function ApplyForm({ job, experienceTypes }) {
  const [submitting, setSubmitting] = useState(false);
  const [submittingError, setSubmittingError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // eslint-disable-next-line no-console
  const onSubmit = async (data) => {
    let err = false;
    setSubmitting(true);
    setSubmittingError(false);
    try {
      const response = await submitData({
        ...data,
        job: job.name,
      });
      if (response.status === 'ok') {
        window.location = '/job-application-accepted';
      } else {
        err = true;
      }
    } catch {
      err = true;
    }
    if (err) {
      setSubmitting(false);
      setSubmittingError(true);
    }
  };

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
        <FieldLabel
          name=""
          label="Оцените свой опыт"
          helpText="0 - Нет опыта;
          1 - Небольшой опыт, занимаюсь время от времени;
          2 - Работаю с этим почти каждый день;
          3 - Работаю много лет, знаю много интересных вещей;
          4 - Эксперт, пишу статьи, выступаю на конференциях и т.д."
          isRequired
        />
        {Object.keys(experienceTypes).map((name) => (
          <ExperienceRadioField
            key={name}
            name={name}
            errors={errors}
            register={register}
          />
        ))}
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
        <button
          className={styles.submit}
          type="submit"
          disabled={submitting}
        >
          {submitting ? 'Отправляем...' : 'Отправить'}
        </button>
        <FormErrorMessage
          error={
            submittingError ? {
              message: (
                <>
                  При отправке формы произошла ошибка.<br />
                  При повторении ошибки напишите нам на{' '}
                  <a href="mailto:job@ivelum.com">
                    job@ivelum.com
                  </a>
                </>
              ),
            } : null
          }
        />
      </form>
    </GenericPage>
  );
}

ApplyForm.propTypes = {
  job: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  experienceTypes: PropTypes.object.isRequired,
};
