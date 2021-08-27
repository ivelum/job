import { useLocation } from '@reach/router';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';

import logoIvelumSmall from '@/images/logo-small.png';
import logoIvelum from '@/images/logo.png';

import Jobs from '@/Jobs';
import useSiteMetadata from '@/hooks/use-site-metadata';

export default function Metadata({ pageTitle }) {
  const location = useLocation();
  const { siteUrl, title: siteName } = useSiteMetadata();
  const description = 'Сегодня открыты две вакансии: '
      + `${Jobs.php.fullTitle} и ${Jobs.python.fullTitle}`;
  const metaTitle = pageTitle === siteName
    ? pageTitle
    : `${siteName} - ${pageTitle}`;
  return (
    <Helmet>
      <title>{pageTitle}</title>,
      <meta name="description" content={description} />
      <meta name="og:site_name" content={siteName} />
      <meta name="og:title" content={metaTitle} />
      <meta name="og:description" content={description} />
      <meta name="og:type" content="website" />
      <meta name="og:url" content={`${siteUrl}${location.pathname}`} />
      <meta name="og:locale" content="ru_RU" />
      <meta name="og:image" content={`${siteUrl}${logoIvelum}`} />
      <meta name="og:image:width" content="1200" />
      <meta name="og:image:height" content="250" />
      <meta name="og:image" content={`${siteUrl}${logoIvelumSmall}`} />
      <meta name="og:image:width" content="270" />
      <meta name="og:image:height" content="250" />
    </Helmet>
  );
}

Metadata.propTypes = {
  pageTitle: PropTypes.string.isRequired,
};
