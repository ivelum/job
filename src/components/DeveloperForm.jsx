import { yupResolver } from '@hookform/resolvers/yup';
import { useBreakpoint } from 'gatsby-plugin-breakpoints';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import ApplicationForm,
{ getFormDataShape, numberTypeErr } from './ApplicationForm';
import {
  allExperienceTypes,
} from './ExperienceRadioField';

import * as styles from './ApplicationForm.module.scss';

export { allExperienceTypes };

const getFormSchema = (experienceTypes) => {
  const baseDataShape = getFormDataShape(experienceTypes);
  const dataShape = {
    ...baseDataShape,
    experienceOverall: yup.number().typeError(numberTypeErr).required().min(0),
    specializedExperience:
      yup.number().typeError(numberTypeErr).required().min(0),
    linuxCommands: yup.string().required(),
    portfolio: yup.string().required(),
  };
  const schema = yup.object().shape(dataShape);
  return schema;
};

class DeveloperFormComponent extends ApplicationForm {
  sectionItemsGeneral() {
    const data = super.sectionItemsGeneral();
    data.rows.push({
      id: 'section-general-2',
      items: (
        <>
          <div className={styles.formCol2}>
            {super.renderField({
              name: 'experienceOverall',
              label: 'Сколько у вас лет опыта в программировании?',
              componentProps: {
                className: styles.formControl,
              },
            })}
          </div>
          <div className={styles.formCol2}>
            {super.renderField({
              name: 'specializedExperience',
              label: 'Сколько из них связано с веб-разработкой?',
              componentProps: {
                className: styles.formControl,
              },
            })}
          </div>
        </>
      ),
    });
    return data;
  }

  sectionItemsAdditionalInfo() {
    const data = super.sectionItemsAdditionalInfo();
    const row1 = {
      id: 'section-additional-2',
      props: {
        gutterY: true,
      },
      items: (
        <>
          <div className={styles.formCol1}>
            {super.renderField({
              name: 'linuxCommands',
              label: 'Назовите консольные команды Linux, '
                + 'состоящих из 3 символов, сколько вспомните',
              helpText: 'Подглядывать нечестно',
              componentProps: {
                className: styles.formControl,
              },
            })}
          </div>
          <div className={styles.formCol1}>
            {super.renderField({
              name: 'portfolio',
              label: 'Где можно посмотреть ваш код? GitHub, '
                + 'GitLab, иное.',
              helpText: 'Желательно ссылки на свои проекты, не форки',
              componentProps: {
                className: styles.formControl,
              },
            })}
          </div>
        </>
      ),
    };
    data.rows[0].props = { gutterY: false };
    data.rows.unshift(row1);
    return data;
  }
}

DeveloperFormComponent.propTypes = {
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
  breakpoints: PropTypes.object.isRequired,
};

export default function DeveloperForm({ job, experienceTypes }) {
  const form = useForm({
    resolver: yupResolver(getFormSchema(experienceTypes)),
  });
  const breakpoints = useBreakpoint();
  const props = {
    breakpoints,
    experienceTypes,
    form,
    job,
  };
  return (
    <DeveloperFormComponent {...props} />
  );
}

DeveloperForm.propTypes = {
  job: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
  }).isRequired,
  experienceTypes: PropTypes.object.isRequired,
};
