import { Link } from 'gatsby';
import React from 'react';

import GenericPage from '@components/GenericPage';

export default function NotFoundPage() {
  return (
    <GenericPage title="Not found">
      <h1>Page not found</h1>
      <p>
        Sorry{' '}
        <span role="img" aria-label="Pensive emoji">
          😔
        </span>{' '}
        we couldn’t find what you were looking for.
        <br />
        <Link to="/">Go home</Link>.
      </p>
    </GenericPage>
  );
}
