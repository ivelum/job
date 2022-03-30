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
    <Link className={styles.item} to={job.url}>
      <span className={styles.num}>
        {(index + 1).toLocaleString('en-US', {
          minimumIntegerDigits: 2,
          useGrouping: false,
        })}
      </span>
      <span className={styles.title}>
        {job.title}
        <span className={styles.subTitle}>
          {job.subTitle}
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
    subTitle: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default function IndexVacancies() {
  const active = _.filter(Jobs, { active: true });
  const inactive = _.filter(Jobs, { active: false });
  return (
    <div className={styles.vacancies}>
      {active.length > 0 && (
        <>
          <HrLine />
          <div className={styles.wrapper}>
            <h2>Открытые вакансии</h2>
            <div className={styles.list}>
              {active.map((job, i) => (
                <JobLink job={job} key={job.url} index={i} />
              ))}
            </div>
          </div>
        </>
      )}
      {inactive.length > 0 && (
        <>
          <HrLine />
          <div className={cn(styles.wrapper, styles.wrapperInactive)}>
            <h2>Неактивные (закрытые) вакансии</h2>
            <div className={styles.list}>
              {inactive.map((job, i) => (
                <JobLink job={job} key={job.url} index={i + active.length} />
              ))}
            </div>
          </div>
        </>
      )}
      {active.length + inactive.length === 0 && (
        <>
          <HrLine />
          <div className={styles.wrapper}>
            <h2>Открытых вакансий сейчас нет</h2>
          </div>
        </>
      )}
    </div>
  );
}
