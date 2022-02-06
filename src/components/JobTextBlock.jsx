import PropTypes from 'prop-types';
import * as React from 'react';

import * as styles from './JobTextBlock.module.scss';

export default function JobTextBlock({ title, children }) {
  return (
    <div className={styles.job}>
      {!!title && (<h2>{title}</h2>)}
      <div className={styles.jobText}>
        {children}
      </div>
    </div>
  );
}

JobTextBlock.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

JobTextBlock.defaultProps = {
  title: null,
};
