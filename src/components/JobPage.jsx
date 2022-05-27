import PropTypes from 'prop-types';
import React from 'react';

import About from './About';
import Button from './Button';
import HrLine from './HrLine';

import * as styles from './JobPage.module.scss';

export default function JobPage({ children, job }) {
  let applicationLink;
  if (job.active) {
    applicationLink = (
      <div className={styles.jobButton}>
        <Button confettiAnimation href={`${job.url}form/`}>
          Откликнуться на вакансию
        </Button>
      </div>
    );
  } else {
    applicationLink = (
      <div className={styles.jobButton}>
        <Button href={`${job.url}form/`} disabled>
          Вакансия закрыта, прием откликов прекращен
        </Button>
      </div>
    );
  }

  return (
    <div className={styles.job}>
      <About />
      {applicationLink}
      <HrLine />
      {children}
      <HrLine />
      {applicationLink}
    </div>
  );
}

JobPage.propTypes = {
  children: PropTypes.node.isRequired,
  job: PropTypes.object.isRequired,
};
