import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import CalloutLink from './CalloutLink';
import GenericPage from './GenericPage';

export default function JobPage({ applyLink, children, title }) {
  return (
    <GenericPage title={`${title} / работа в ivelum`}>
      <p>
        <Link to="/">&lt;- Все вакансии</Link>
      </p>
      <h1>{title}</h1>
      <CalloutLink to={applyLink}>Откликнуться</CalloutLink>

      {children}

      <CalloutLink to={applyLink}>Откликнуться</CalloutLink>
    </GenericPage>
  );
}

JobPage.propTypes = {
  applyLink: PropTypes.string.isRequired,
  children: PropTypes.node,
  title: PropTypes.string.isRequired,
};

JobPage.defaultProps = {
  children: null,
};
