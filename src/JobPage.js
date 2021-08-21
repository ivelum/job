import { Link } from 'gatsby';
import * as React from 'react';

import GenericPage from './GenericPage';

export default function JobPage({ children, title }) {
  return (
    <GenericPage title={`${title} / вакансия в ivelum`}>
      <p>
        <Link to="/">&lt;- Все вакансии</Link>
      </p>
      <h1>{title}</h1>
      {children}
    </GenericPage>
  )
}
