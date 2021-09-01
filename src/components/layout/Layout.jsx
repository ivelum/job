import PropTypes from 'prop-types';
import * as React from 'react';

import Metadata from './Metadata';

import Footer from '@/components/Footer';
import GithubButton from '@/components/GithubButton';
import PageTitle from '@/components/PageTitle';
import Header from '@/components/layout/Header';
import * as styles from '@/components/layout/Layout.module.scss';

export default function Layout({
  pageTitle, subTitle, backLink,
  metaTitle, metaDescription,
  children,
}) {
  return (
    <>
      <Metadata
        pageTitle={metaTitle || pageTitle}
        description={metaDescription}
      />
      <div className={styles.container}>
        <Header />
        <GithubButton />
        <PageTitle title={pageTitle} subTitle={subTitle} backLink={backLink} />
        <div className={styles.content}>
          {children}
        </div>
        <Footer />
      </div>
    </>
  );
}

Layout.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  metaTitle: PropTypes.string,
  metaDescription: PropTypes.string,
  children: PropTypes.node.isRequired,
  backLink: PropTypes.object,
};

Layout.defaultProps = {
  subTitle: null,
  metaTitle: null,
  metaDescription: null,
  backLink: null,
};
