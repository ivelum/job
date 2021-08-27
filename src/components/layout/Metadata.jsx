import { useLocation } from '@reach/router';
import PropTypes from 'prop-types';
import React from 'react';
import { Helmet } from 'react-helmet';

import useSiteMetadata from '@hooks/use-site-metadata';

import logoIvelum from '@images/logo.png';

export default function Metadata({ pageTitle }) {
  const location = useLocation();
  const { siteUrl, title: siteName, description } = useSiteMetadata();
  const metaTitle = pageTitle === siteName
    ? pageTitle
    : `${siteName} - ${pageTitle}`;
  return (
    <Helmet>
      <title>{pageTitle}</title>,
      <meta name="description" content={description} />,
      <meta name="og:site_name" content={siteName} />,
      <meta name="og:title" content={metaTitle} />,
      <meta name="og:description" content={description} />,
      <meta name="og:type" content="website" />,
      <meta name="og:image" content={`${siteUrl}${logoIvelum}`} />,
      <meta name="og:url" content={`${siteUrl}${location.pathname}`} />,
      <meta name="og:locale" content="ru_RU" />,
    </Helmet>
  );
}

Metadata.propTypes = {
  pageTitle: PropTypes.string.isRequired,
};
