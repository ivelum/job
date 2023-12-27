import cn from 'classnames';
import { navigate, Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import * as yup from 'yup';

import Button from './Button';
import CountryDropdown from './CountryDropdown';
import ExperienceRadioField from './ExperienceRadioField';
import ExternalLink, { ExternalLinks } from './ExternalLink';
import Field from './Field';
import FormErrorMessage from './FormErrorMessage';
import HrLine from './HrLine';
import Row from './Row';

import * as styles from './ApplicationForm.module.scss';

const lockedCountryErr = (
  'В настоящее время у нас нет возможности работать с этой страной.'
);

export const numberTypeErr = 'Ожидается число.';

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

const country = yup.string().required().test(
  'checkCountryLocked',
  lockedCountryErr,
  (value) => [
    // https://en.wikipedia.org/wiki/European_Union_tax_haven_blacklist
    'AS', 'AI', 'BB', 'DM', 'FJ', 'GU', 'PA', 'SC', 'TT', 'PW', 'VI', 'VU',
    'WS',
    // https://en.wikipedia.org/wiki/United_States_sanctions#Countries
    // ... Combined, the Treasury Department, the Commerce Department and the
    // State Department list embargoes against 20 countries or territories:
    'AF', 'BO', 'BY', 'CN', 'CU', 'ER', 'IR', 'KH', 'KP', 'LA', 'NI', 'PS',
    'RU', 'SY', 'VE', 'YE', 'ZW',
    // Concerns about internet freedom and/or political stability.
    // Not included in any list above:
    'AZ', 'TM', 'SA', 'NE',
    // High taxes.
    // Not included in any list above:
    'IL', 'LV', 'TR', 'US',
  ].indexOf(value) === -1,
);

export const getFormDataShape = (experienceTypes) => {
  const dataShape = {
    fullName: yup.string().required(),
    country,
    city: yup.string().required(),
    email: yup.string().required().email(),
    education: yup.string().required(),
    lovedTasks: yup.string().required(),
    unlovedTasks: yup.string().required(),
    english: yup.string().required(),
    referrer: yup.string().required(),
  };
  Object.keys(experienceTypes).forEach((name) => {
    const fieldName = `experience${name}`;
    dataShape[fieldName] = yup.mixed().required();
  });
  return dataShape;
};

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

export default class ApplicationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitting: false,
      submissionError: false,
    };
    // this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { job } = this.props;
    if (prevProps.job.active !== job.active && !job.active) navigate(job.url);
  }

  onSubmitError = async (errors) => {
    // eslint-disable-next-line no-console
    console.error(errors);
    this.setState({
      submitting: false,
      submissionError: true,
    });
  };

  onSubmit = async (data) => {
    const { job } = this.props;
    this.setState({
      submitting: true,
      submissionError: false,
    });

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
      this.setState({
        submitting: false,
        submissionError: true,
      });
    }
  };

  sectionItemsAdditionalInfo() {
    const textareaMaxRows = this.props.breakpoints.md ? 11 : 7;
    return {
      title: 'Дополнительно',
      rows: [
        {
          id: 'section-additional-1',
          props: {
            gutterY: true,
          },
          items: (
            <>
              <div className={styles.formCol1}>
                {this.renderField({
                  name: 'lovedTasks',
                  label: 'Какого рода задачами вам больше '
                    + 'всего нравится заниматься?',
                  helpText: 'То, что нравится, обычно делается легко и быстро',
                  component: TextareaAutosize,
                  componentProps: {
                    className: styles.formControl,
                    maxRows: textareaMaxRows,
                  },
                })}
              </div>
              <div className={styles.formCol1}>
                {this.renderField({
                  name: 'unlovedTasks',
                  label: 'А чем не нравится заниматься?',
                  helpText: 'Бывают вещи, которые приходится делать '
                    + 'через силу или не хочется делать совсем',
                  component: TextareaAutosize,
                  componentProps: {
                    className: styles.formControl,
                    maxRows: textareaMaxRows,
                  },
                })}
              </div>
              <div className={styles.formCol1}>
                {this.renderField({
                  name: 'recommendedBy',
                  label: 'Знакомы ли вы с кем-то из ivelum?',
                  helpText: 'Если кто-то из наших сотрудников может вас '
                    + 'порекомендовать, это упростит прохождение собеседований.'
                    + ' Если вы знаете такого человека, укажите его имя здесь',
                  isRequired: false,
                  componentProps: {
                    className: styles.formControl,
                  },
                })}
              </div>
              <div className={styles.formCol1}>
                {this.renderField({
                  name: 'referrer',
                  label: 'Откуда вы узнали о вакансии?',
                  helpText: 'Название сайта или чата с объявлением / может, '
                    + 'мы вам сами написали / или друзья прислали ссылку',
                  componentProps: {
                    className: styles.formControl,
                  },
                })}
              </div>
            </>
          ),
        },
      ],
    };
  }

  sectionItemsExperience() {
    const { experienceTypes } = this.props;
    const {
      register,
      formState: { errors },
    } = this.props.form;
    return {
      title: 'Оцените свой опыт',
      legend: (
        <div className={styles.experienceLegend}>
          0&nbsp;&mdash; Нет опыта;
          1&nbsp;&mdash; Небольшой опыт, занимаюсь время от&nbsp;времени;
          2&nbsp;&mdash; Работаю с&nbsp;этим почти каждый день;
          3&nbsp;&mdash; Работаю много лет, знаю много интересных вещей;
          4&nbsp;&mdash; Эксперт, пишу статьи, выступаю
          на&nbsp;конференциях и&nbsp;т.д.
        </div>
      ),
      rows: [
        {
          id: 'section-experience-1',
          props: {
            gutterY: true,
          },
          items: (
            <>
              {Object.keys(experienceTypes).map((name) => (
                <ExperienceRadioField
                  key={name}
                  name={name}
                  errors={errors}
                  register={register}
                />
              ))}
            </>
          ),
        },
      ],
    };
  }

  sectionItemsGeneral() {
    const { setValue } = this.props.form;
    return {
      title: 'О вас',
      rows: [
        {
          id: 'section-general-1',
          props: {
            gutterY: true,
          },
          items: (
            <>
              <div className={styles.formCol2}>
                {this.renderField({
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
                {this.renderField({
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
              <div className={styles.formSpacer} />
              <div className={styles.formCol2}>
                {this.renderField({
                  name: 'city',
                  label: 'Город или населенный пункт',
                  componentProps: {
                    className: styles.formControl,
                  },
                })}
              </div>
              <div className={styles.formSpacer} />
              <div className={styles.formCol3}>
                {this.renderField({
                  name: 'email',
                  label: 'Ваш Email',
                  componentProps: {
                    className: styles.formControl,
                  },
                })}
              </div>
              <div className={styles.formCol3}>
                {this.renderField({
                  name: 'telegram',
                  label: 'Telegram ...',
                  isRequired: false,
                  componentProps: {
                    className: styles.formControl,
                  },
                })}
              </div>
              <div className={styles.formCol3}>
                {this.renderField({
                  name: 'whatsapp',
                  label: '... или Whatsapp',
                  isRequired: false,
                  componentProps: {
                    className: styles.formControl,
                  },
                })}
              </div>
              <div className={styles.formCol1}>
                {this.renderField({
                  name: 'education',
                  label: 'Какое у вас образование?',
                  helpText: 'Учебное заведение, год окончания, специальность',
                  componentProps: {
                    className: styles.formControl,
                  },
                })}
              </div>
              <div className={styles.formCol1}>
                {this.renderField({
                  name: 'english',
                  label: 'Как у вас с английским?',
                  helpText: 'С письменным, с устным?',
                  componentProps: {
                    className: styles.formControl,
                  },
                })}
              </div>
            </>
          ),
        },
      ],
    };
  }

  renderField({
    name, label, helpText, isRequired,
    component, componentProps,
  }) {
    const {
      register,
      formState: { errors },
    } = this.props.form;
    return (
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
  }

  // eslint-disable-next-line class-methods-use-this
  renderSection(config) {
    return config ? (
      <>
        <h2 className={styles.formTitle}>{config.title}</h2>
        {config?.legend}
        <div className={styles.formBlock}>
          {
            (config?.rows ?? []).map((row) => (
              <Row {...row?.props} key={`section-row-${row.id}`}>
                {row.items}
              </Row>
            ))
          }
        </div>
      </>
    ) : null;
  }

  renderSectionExperience() {
    return this.renderSection(this.sectionItemsExperience());
  }

  renderSectionGeneral() {
    return this.renderSection(this.sectionItemsGeneral());
  }

  renderSectionAdditionalInfo() {
    return this.renderSection(this.sectionItemsAdditionalInfo());
  }

  render() {
    const { job } = this.props;
    if (!job.active) {
      return null;
    }

    const { handleSubmit } = this.props.form;
    const { submitting, submissionError } = this.state;

    return (
      <form onSubmit={handleSubmit(this.onSubmit, this.onSubmitError)}>
        <div className={styles.applyForm}>
          <div className={styles.vacancyTitle}>
            <Link
              className={cn(styles.vacancyLink, 'noUnderline')}
              to={job.url}
            >
              {job.title}
            </Link>
            <span className={styles.vacancySubTitle}>{job.subTitle}</span>
          </div>
          <HrLine />
          {this.renderSectionGeneral()}
          {this.renderSectionExperience()}
          {this.renderSectionAdditionalInfo()}
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
}

ApplicationForm.propTypes = {
  job: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
  }).isRequired,
  experienceTypes: PropTypes.object.isRequired,
  form: PropTypes.shape({
    register: PropTypes.func.isRequired,
    setValue: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    formState: PropTypes.shape({
      errors: PropTypes.object,
    }),
  }).isRequired,
  breakpoints: PropTypes.shape({
    md: PropTypes.number,
  }).isRequired,
};
