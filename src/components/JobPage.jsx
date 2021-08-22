import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import CalloutLink from './CalloutLink';
import GenericPage from './GenericPage';

export default function JobPage({ children, job }) {
  const applyLink = `${job.url}form/`;
  return (
    <GenericPage title={`${job.title} / работа в ivelum`}>
      <p>
        <Link to="/">&lt;- Все вакансии</Link>
      </p>
      <h1>{job.title}</h1>
      <CalloutLink to={applyLink}>Откликнуться</CalloutLink>

      {children}

      <CalloutLink to={applyLink}>Откликнуться</CalloutLink>
    </GenericPage>
  );
}

JobPage.propTypes = {
  children: PropTypes.node.isRequired,
  job: PropTypes.shape({
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
};
