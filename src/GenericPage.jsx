import PropTypes from 'prop-types';
import React from 'react';

import * as styles from './GenericPage.module.css';

export default function GenericPage({ children, title }) {
  return (
    <main className={styles.main}>
      <title>{title}</title>
      {children}
    </main>
  );
}

GenericPage.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
};

GenericPage.defaultProps = {
  children: null,
};
