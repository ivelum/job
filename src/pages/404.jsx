import { Link } from 'gatsby';
import React from 'react';

import Layout from '@/components/layout/Layout';

export default function NotFoundPage() {
  return (
    <Layout pageTitle="Page not found">
      <p>
        Sorry{' '}
        <span role="img" aria-label="Pensive emoji">
          😔
        </span>{' '}
        we couldn’t find what you were looking for.
        <br />
        <Link to="/">Go home</Link>.
      </p>
    </Layout>
  );
}
