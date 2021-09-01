import PropTypes from 'prop-types';
import React from 'react';

import About from '@/components/About';
import Button from '@/components/Button';
import HrLine from '@/components/HrLine';
import * as styles from '@/components/JobPage.module.scss';

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
