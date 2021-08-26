import { navigate } from 'gatsby';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import CountryDropdown from './CountryDropdown';
import ExperienceRadioField, {
  allExperienceTypes,
} from './ExperienceRadioField';
import Field from './Field';
import Button from '@components/Button';
import ExternalLink from '@components/ExternalLink';
import FormErrorMessage from '@components/FormErrorMessage';
import HrLine from '@components/HrLine';

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
  const [submissionError, setSubmissionError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    let err = false;
    setSubmitting(true);
    setSubmissionError(false);
    try {
      const response = await submitData({
        ...data,
        job: job.name,
      });
      if (response.status === 'ok') {
        await navigate('/job-application-accepted/');
      } else {
        err = true;
      }
    } catch {
      err = true;
    }
    if (err) {
      setSubmitting(false);
      setSubmissionError(true);
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
    <div className="row justify-content-center">
      <div className="col-12 col-xl-10">
        <div className={styles.vacancyTitle}>
          {job.title}
          <span className={styles.subTitle}>{job.subTitle}</span>
        </div>
        <HrLine />
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <h2 className="mt-30 mt-lg-40 mt-xl-50">О вас</h2>
          <div className="mt-20 mt-md-30">
            <div className="row gy-30">
              <div className="col-12 col-lg-6">
                {renderField({
                  name: 'fullName',
                  label: 'Ваше имя и фамилия:',
                  componentProps: {
                    autoFocus: true,
                    className: 'formControl',
                  },
                })}
              </div>
              <div className="w-100 mt-0" />
              <div className="col-12 col-md-6">
                {renderField({
                  name: 'country',
                  label: 'Страна проживания',
                  component: CountryDropdown,
                  registerProps: { validate: checkCountry },
                  componentProps: {
                    className: 'customSelect',
                  },
                })}
              </div>
              <div className="col-12 col-md-6">
                {renderField({
                  name: 'city',
                  label: 'Город или населенный пункт',
                  componentProps: {
                    className: 'formControl',
                  },
                })}
              </div>
              <div className="col-12 col-md-4">
                {renderField({
                  name: 'email',
                  label: 'Ваш Email',
                  componentProps: {
                    className: 'formControl',
                  },
                })}
              </div>
              <div className="col-12 col-md-4">
                {renderField({
                  name: 'telegram',
                  label: 'Telegram',
                  isRequired: false,
                  componentProps: {
                    className: 'formControl',
                  },
                })}
              </div>
              <div className="col-12 col-md-4">
                {renderField({
                  name: 'skype',
                  label: 'Skype',
                  isRequired: false,
                  componentProps: {
                    className: 'formControl',
                  },
                })}
              </div>
            </div>
          </div>
          <h2 className="mt-30 mt-lg-40 mt-xl-50">Ваш опыт</h2>
          <div className="mt-20 mt-md-30">
            <div className="row gy-30">
              <div className="col-12 col-md-6">
                {renderField({
                  name: 'experienceOverall',
                  label: 'Сколько лет опыта в программировании?',
                  componentProps: {
                    className: 'formControl',
                  },
                })}
              </div>
              <div className="col-12 col-md-6">
                {renderField({
                  name: 'experienceWeb',
                  label: 'Сколько из них с веб-разработкой?',
                  componentProps: {
                    className: 'formControl',
                  },
                })}
              </div>
            </div>
          </div>
          <h2 className="mt-30 mt-lg-40 mt-xl-50">Оцените свой опыт</h2>
          <div className="mt-20 mt-md-30">
            <div className={styles.experienceLegend}>
              0&nbsp;&mdash; Нет опыта;
              1&nbsp;&mdash; Небольшой опыт, занимаюсь время от&nbsp;времени;
              2&nbsp;&mdash; Работаю с&nbsp;этим почти каждый день;
              3&nbsp;&mdash; Работаю много лет, знаю много интересных вещей;
              4&nbsp;&mdash; Эксперт, пишу статьи, выступаю
              на&nbsp;конференциях и&nbsp;т.д.
            </div>
            <div className="mt-20 mt-md-30">
              <div className="row gy-30 align-items-center">
                {Object.keys(experienceTypes).map((name) => (
                  <ExperienceRadioField
                    key={name}
                    name={name}
                    errors={errors}
                    register={register}
                  />
                ))}
              </div>
            </div>
          </div>
          <h2 className="mt-30 mt-lg-40 mt-xl-50">Дополнительно</h2>
          <div className="mt-20 mt-md-30">
            <div className="row gy-30">
              <div className="col-12">
                {renderField({
                  name: 'education',
                  label: 'Какое у вас образование?',
                  helpText: 'Учебное заведение, год окончания, специальность.',
                  componentProps: {
                    className: 'formControl',
                  },
                })}
              </div>
              <div className="col-12">
                {renderField({
                  name: 'linuxCommands',
                  label: 'Назовите консольные команды Linux, '
                    + 'состоящих из 3 символов, сколько вспомните?',
                  helpText: 'Подглядывать нечестно.',
                  componentProps: {
                    className: 'formControl',
                  },
                })}
              </div>
              <div className="col-12">
                {renderField({
                  name: 'lovedTasks',
                  label: 'Какого рода задачами вам больше '
                    + 'всего нравится заниматься?',
                  helpText: 'Кто-то любит проектировать архитектуру, '
                    + 'кто-то UI, кто-то заниматься исследованиями нового. '
                    + 'То, что нравится, обычно делается легко и быстро.',
                  componentProps: {
                    className: 'formControl',
                  },
                })}
              </div>
              <div className="col-12">
                {renderField({
                  name: 'unlovedTasks',
                  label: 'А чем не нравится заниматься?',
                  helpText: 'Бывают вещи, от которых воротит, которые '
                    + 'приходится делать через силу. Их не получется делать '
                    + 'быстро или не получается делать совсем.',
                  componentProps: {
                    className: 'formControl',
                  },
                })}
              </div>
              <div className="col-12">
                {renderField({
                  name: 'sourceCode',
                  label: 'Где можно посмотреть ваш код? GitHub, '
                    + 'Bitbucket, иное.',
                  helpText: 'Желательно ссылки на свои проекты, не форки.',
                  componentProps: {
                    className: 'formControl',
                  },
                })}
              </div>
              <div className="col-12">
                {renderField({
                  name: 'english',
                  label: 'Как у вас с английским?',
                  helpText: 'С письменным, с устным?',
                  componentProps: {
                    className: 'formControl',
                  },
                })}
              </div>
              <div className="col-12">
                {renderField({
                  name: 'referrer',
                  label: 'Откуда вы узнали о вакансии?',
                  helpText: 'Наименование сайта с объявлением / может, '
                    + 'мы вам написали сами / или друзья прислали ссылку',
                  componentProps: {
                    className: 'formControl',
                  },
                })}
              </div>
            </div>
            <HrLine />
            <div className="mt-40 mt-xl-50 d-flex flex-column flex-sm-row">
              <Button
                confettiAnimation
                type="submit"
              >
                {submitting
                  ? 'Отправляем отклик...'
                  : 'Откликнуться на вакансию'}
              </Button>
              <FormErrorMessage
                error={
                  submissionError ? {
                    message: (
                      <>
                        При отправке формы произошла ошибка.<br />
                        При повторении ошибки напишите нам на{' '}
                        <ExternalLink href="mailto:job@ivelum.com">
                          job@ivelum.com
                        </ExternalLink>
                      </>
                    ),
                  } : null
                }
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

ApplyForm.propTypes = {
  job: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  experienceTypes: PropTypes.object.isRequired,
};
