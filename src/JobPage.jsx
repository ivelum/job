import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import GenericPage from './GenericPage';

export default function JobPage({ children, title }) {
  return (
    <GenericPage title={`${title} / работа в ivelum`}>
      <p>
        <Link to="/">&lt;- Все вакансии</Link>
      </p>
      <h1>{title}</h1>
      {children}
    </GenericPage>
  );
}

JobPage.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
};

JobPage.defaultProps = {
  children: null,
};
