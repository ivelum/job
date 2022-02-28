import { yupResolver } from '@hookform/resolvers/yup';
import { navigate, Link } from 'gatsby';
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';
import * as yup from 'yup';

import Button from './Button';
import CountryDropdown from './CountryDropdown';
import ExperienceRadioField, {
  allExperienceTypes,
} from './ExperienceRadioField';
import ExternalLink, { ExternalLinks } from './ExternalLink';
import Field from './Field';
import FormErrorMessage from './FormErrorMessage';
import HrLine from './HrLine';
import Row from './Row';

import * as styles from './ApplyForm.module.scss';

export { allExperienceTypes };

const ruLockedErr = (
  'Найм из России по этой вакансии временно приостановлен. '
  + 'Мы надеемся, что это временная ситуация. Сроки возобновления '
  + 'найма в России прогнозировать сложно, но, скорее всего, '
  + 'это произойдет не раньше чем через несколько недель.'
);

const lockedCountryErr = (
  'В настоящее время у нас нет возможности работать с этой страной.'
);

const numberTypeErr = 'Ожидается число.';

const apiUrl = 'https://1jlrn8msi3.execute-api.eu-north-1.amazonaws.com/';

yup.setLocale({
  mixed: {
    required: 'Обязательное поле.',
  },
  number: {
    // eslint-disable-next-line no-template-curly-in-string
    min: 'Минимальное значение - ${min}',
  },
});

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

export default function ApplyForm({ job, experienceTypes, ruEnabled }) {
  const [submitting, setSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState(false);

  let country = yup.string().required().test(
    'checkCountryLocked',
    lockedCountryErr,
    (value) => ['AZ', 'BY', 'CN', 'KZ', 'LV', 'UZ'].indexOf(value) === -1,
  );
  if (!ruEnabled) {
    country = country.test(
      'checkRuLocked',
      ruLockedErr,
      (value) => value !== 'RU',
    );
  }

  const dataShape = {
    fullName: yup.string().required(),
    country,
    city: yup.string().required(),
    email: yup.string().required().email(),
    experienceOverall: yup.number().typeError(numberTypeErr).required().min(0),
    experienceWeb: yup.number().typeError(numberTypeErr).required().min(0),
    education: yup.string().required(),
    linuxCommands: yup.string().required(),
    lovedTasks: yup.string().required(),
    unlovedTasks: yup.string().required(),
    sourceCode: yup.string().required(),
    english: yup.string().required(),
    referrer: yup.string().required(),
  };
  Object.keys(experienceTypes).forEach((name) => {
    const fieldName = `experience${name}`;
    dataShape[fieldName] = yup.mixed().required();
  });
  const schema = yup.object().shape(dataShape);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
    setSubmitting(true);
    setSubmissionError(false);
    let successSending = false;
    try {
      if (process.env.NODE_ENV === 'production') {
        const response = await submitData({
          ...data,
          job: job.name,
        });
        successSending = response.status === 'ok';
      } else {
        // eslint-disable-next-line no-console
        console.log(data);
        successSending = true;
      }
      if (successSending) {
        await navigate('/job-application-accepted/');
      }
    } catch {
      successSending = false;
    }
    if (!successSending) {
      setSubmitting(false);
      setSubmissionError(true);
    }
  };

  const breakpoints = useBreakpoint();

  const textareaMaxRows = breakpoints.md ? 11 : 7;

  const renderField = ({
    name, label, helpText, isRequired,
    component, componentProps,
  }) => (
    <Field
      name={name}
      label={label}
      helpText={helpText}
      isRequired={isRequired}
      errors={errors}
      component={component}
      componentProps={componentProps}
      registerField={register}
    />
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.applyForm}>
        <div className={styles.vacancyTitle}>
          <Link className={styles.vacancyLink} to={job.url}>{job.title}</Link>
          <span className={styles.vacancySubTitle}>{job.subTitle}</span>
        </div>
        <HrLine />
        <h2 className={styles.formTitle}>О вас</h2>
        <div className={styles.formBlock}>
          <Row gutterY>
            <div className={styles.formCol2}>
              {renderField({
                name: 'fullName',
                label: 'Ваше имя и фамилия:',
                componentProps: {
                  autoFocus: true,
                  className: styles.formControl,
                },
              })}
            </div>
            <div className={styles.formSpacer} />
            <div className={styles.formCol2}>
              {renderField({
                name: 'country',
                label: 'Страна проживания',
                component: CountryDropdown,
                componentProps: {
                  className: styles.formSelect,
                  onChange: (e) => {
                    setValue(
                      'country',
                      e.target.value,
                      { shouldValidate: true },
                    );
                  },
                },
              })}
            </div>
            <div className={styles.formCol2}>
              {renderField({
                name: 'city',
                label: 'Город или населенный пункт',
                componentProps: {
                  className: styles.formControl,
                },
              })}
            </div>
            <div className={styles.formCol3}>
              {renderField({
                name: 'email',
                label: 'Ваш Email',
                componentProps: {
                  className: styles.formControl,
                },
              })}
            </div>
            <div className={styles.formCol3}>
              {renderField({
                name: 'telegram',
                label: 'Telegram',
                isRequired: false,
                componentProps: {
                  className: styles.formControl,
                },
              })}
            </div>
            <div className={styles.formCol3}>
              {renderField({
                name: 'skype',
                label: 'Skype',
                isRequired: false,
                componentProps: {
                  className: styles.formControl,
                },
              })}
            </div>
            <div className={styles.formCol2}>
              {renderField({
                name: 'experienceOverall',
                label: 'Сколько у вас лет опыта в программировании?',
                componentProps: {
                  className: styles.formControl,
                },
              })}
            </div>
            <div className={styles.formCol2}>
              {renderField({
                name: 'experienceWeb',
                label: 'Сколько из них связано с веб-разработкой?',
                componentProps: {
                  className: styles.formControl,
                },
              })}
            </div>
            <div className={styles.formCol1}>
              {renderField({
                name: 'education',
                label: 'Какое у вас образование?',
                helpText: 'Учебное заведение, год окончания, специальность.',
                componentProps: {
                  className: styles.formControl,
                },
              })}
            </div>
            <div className={styles.formCol1}>
              {renderField({
                name: 'english',
                label: 'Как у вас с английским?',
                helpText: 'С письменным, с устным?',
                componentProps: {
                  className: styles.formControl,
                },
              })}
            </div>
          </Row>
        </div>
        <h2 className={styles.formTitle}>Оцените свой опыт</h2>
        <div className={styles.experienceLegend}>
          0&nbsp;&mdash; Нет опыта;
          1&nbsp;&mdash; Небольшой опыт, занимаюсь время от&nbsp;времени;
          2&nbsp;&mdash; Работаю с&nbsp;этим почти каждый день;
          3&nbsp;&mdash; Работаю много лет, знаю много интересных вещей;
          4&nbsp;&mdash; Эксперт, пишу статьи, выступаю
          на&nbsp;конференциях и&nbsp;т.д.
        </div>
        <div className={styles.formBlock}>
          <Row gutterY>
            {Object.keys(experienceTypes).map((name) => (
              <ExperienceRadioField
                key={name}
                name={name}
                errors={errors}
                register={register}
              />
            ))}
          </Row>
        </div>
        <h2 className={styles.formTitle}>Дополнительно</h2>
        <div className={styles.formBlock}>
          <Row gutterY>
            <div className={styles.formCol1}>
              {renderField({
                name: 'linuxCommands',
                label: 'Назовите консольные команды Linux, '
                  + 'состоящих из 3 символов, сколько вспомните?',
                helpText: 'Подглядывать нечестно.',
                componentProps: {
                  className: styles.formControl,
                },
              })}
            </div>
            <div className={styles.formCol1}>
              {renderField({
                name: 'lovedTasks',
                label: 'Какого рода задачами вам больше '
                  + 'всего нравится заниматься?',
                helpText: 'Кто-то любит проектировать архитектуру, '
                  + 'кто-то UI, кто-то заниматься исследованиями нового. '
                  + 'То, что нравится, обычно делается легко и быстро.',
                component: TextareaAutosize,
                componentProps: {
                  className: styles.formControl,
                  maxRows: textareaMaxRows,
                },
              })}
            </div>
            <div className={styles.formCol1}>
              {renderField({
                name: 'unlovedTasks',
                label: 'А чем не нравится заниматься?',
                helpText: 'Бывают вещи, от которых воротит, которые '
                  + 'приходится делать через силу. Их не получется делать '
                  + 'быстро или не получается делать совсем.',
                component: TextareaAutosize,
                componentProps: {
                  className: styles.formControl,
                  maxRows: textareaMaxRows,
                },
              })}
            </div>
            <div className={styles.formCol1}>
              {renderField({
                name: 'sourceCode',
                label: 'Где можно посмотреть ваш код? GitHub, '
                  + 'GitLab, иное.',
                helpText: 'Желательно ссылки на свои проекты, не форки.',
                componentProps: {
                  className: styles.formControl,
                },
              })}
            </div>
            <div className={styles.formCol1}>
              {renderField({
                name: 'recommendedBy',
                label: 'Знакомы ли вы с кем-то из ivelum?',
                helpText: 'Если кто-то из наших сотрудников может вас '
                  + 'порекомендовать, это упростит прохождение собеседований и '
                  + 'предоставит дополнительные бонусы. Если вы знаете такого '
                  + 'человека, укажите его имя здесь',
                isRequired: false,
                componentProps: {
                  className: styles.formControl,
                },
              })}
            </div>
            <div className={styles.formCol1}>
              {renderField({
                name: 'referrer',
                label: 'Откуда вы узнали о вакансии?',
                helpText: 'Наименование сайта с объявлением / может, '
                  + 'мы вам написали сами / или друзья прислали ссылку',
                componentProps: {
                  className: styles.formControl,
                },
              })}
            </div>
          </Row>
        </div>
        <HrLine />
        <div className={styles.formButton}>
          <Button
            confettiAnimation
            type="submit"
          >
            {submitting
              ? 'Отправляем...'
              : 'Отправить'}
          </Button>
          <FormErrorMessage
            error={
              submissionError ? {
                message: (
                  <>
                    При отправке формы произошла ошибка.<br />
                    При повторении ошибки напишите нам на{' '}
                    <ExternalLink href={ExternalLinks.contacts.email}>
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
  ruEnabled: PropTypes.bool,
};

ApplyForm.defaultProps = {
  ruEnabled: false,
};
