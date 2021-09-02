import { useLocation } from '@reach/router';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';

import Jobs from '@/Jobs';
import useSiteMetadata from '@/hooks/use-site-metadata';

export default function Metadata({ pageTitle, description }) {
  const location = useLocation();
  const { siteUrl, title: siteName } = useSiteMetadata();
  const metaDescription = description || (
    'Сегодня открыты две вакансии: '
    + `${Jobs.python.description} и ${Jobs.php.description}`
  );
  const metaTitle = pageTitle === siteName
    ? pageTitle
    : `${siteName} - ${pageTitle}`;
  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="og:title" content={metaTitle} />
      <meta name="og:description" content={metaDescription} />
      <meta name="og:type" content="website" />
      <meta name="og:url" content={`${siteUrl}${location.pathname}`} />
      <meta name="og:locale" content="ru_RU" />
    </Helmet>
  );
}

Metadata.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  description: PropTypes.string,
};

Metadata.defaultProps = {
  description: '',
};
