import PropTypes from 'prop-types';
import React from 'react';

import About from './About';
import Button from './Button';
import HrLine from './HrLine';

import * as styles from './JobPage.module.scss';

export default function JobPage({ children, job }) {
  return (
    <div className={styles.job}>
      <About />
      <div className={styles.jobButton}>
        <Button confettiAnimation href={`${job.url}form/`}>
          Откликнуться на вакансию
        </Button>
      </div>
      <HrLine />
      {children}
      <HrLine />
      <div className={styles.jobButton}>
        <Button confettiAnimation href={`${job.url}form/`}>
          Откликнуться на вакансию
        </Button>
      </div>
    </div>
  );
}

JobPage.propTypes = {
  children: PropTypes.node.isRequired,
  job: PropTypes.object.isRequired,
};
