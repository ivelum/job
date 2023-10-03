import cn from 'classnames';
import { Link } from 'gatsby';
import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';

import HrLine from './HrLine';
import SvgImage from './SvgImage';
import Jobs from '@/Jobs';

import * as styles from './IndexVacancies.module.scss';

function JobLink({ job, index }) {
  return (
    <Link
      className={cn(styles.item, !job.active && styles.inactive)}
      to={job.url}
    >
      <span className={styles.num}>
        {(index + 1).toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}
      </span>
      <span className={styles.title}>
        {job.title}
        <span className={styles.subTitle}>
          {job.active ? job.subTitle : 'Вакансия закрыта'}
        </span>
      </span>
      <SvgImage name="ico-angle-arrow" className={styles.ico} />
    </Link>
  );
}

JobLink.propTypes = {
  job: PropTypes.shape({
    name: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    subTitle: PropTypes.string,
    url: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default function IndexVacancies() {
  const jobList = Object.keys(Jobs);
  const active = _.filter(Jobs, { active: true });
  return (
    <div className={styles.vacancies}>
      <HrLine />
      {jobList.length > 0 && (
        <div className={styles.wrapper}>
          <h2>{active.length > 0
            ? 'Наши вакансии'
            : 'Сейчас открытых вакансий нет'}
          </h2>
          <div className={styles.list}>
            {jobList.map((key, i) => (
              <JobLink job={Jobs[key]} key={Jobs[key].url} index={i} />
            ))}
          </div>
        </div>
      )}
      {jobList.length === 0 && (
        <div className={styles.wrapper}>
          <h2>Вакансий сейчас нет</h2>
        </div>
      )}
    </div>
  );
}
