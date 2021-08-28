import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import * as React from 'react';

import Metadata from './Metadata';

import catImage from '@/images/cat.png';
import githubLogo from '@/images/github-button.svg';
import logoIvelum from '@/images/logo.svg';

import ExternalLink from '@/components/ExternalLink';
import Footer from '@/components/Footer';
import SvgImage from '@/components/SvgImage';
import * as styles from '@/components/layout/Layout.module.scss';

const Layout = ({
  pageTitle, metaTitle, metaDescription, children, backLink,
}) => (
  <>
    <Metadata
      pageTitle={metaTitle || pageTitle}
      description={metaDescription}
    />
    <div className={styles.container}>
      <ExternalLink
        href="https://github.com/ivelum/job"
        className={styles.githubButton}
        noUnderline
      >
        <div className={styles.githubCat}>
          <img
            src={githubLogo}
            className={styles.githubCatImage}
            alt="Fork me on GitHub"
          />
        </div>
        <span className={styles.githubText}>Fork me!</span>
      </ExternalLink>
      <Link
        to="/"
        className={styles.logo}
        activeClassName={styles.logoDisabled}
      >
        <img src={logoIvelum} alt="Ivelum" />
      </Link>
      <div
        className={
            `col-xl-6 col-lg-8 col-md-10 col-12 ${styles.catWrapper}`
          }
      >
        <div className={styles.cat}>
          Мы занимаемся продуктовой разработкой с 2003.
          <img className={styles.catImage} src={catImage} alt="Ivelum cat" />
        </div>
      </div>
      <div className={styles.titleWrapper}>
        <h1>{pageTitle}</h1>
        {!!backLink && (
        <Link className={styles.backLink} to={backLink.url}>
          {backLink.text}
          <SvgImage name="ico-long-arrow" className={styles.ico} />
        </Link>
        )}
      </div>
      <div className={styles.content}>
        {children}
      </div>
      <Footer />
    </div>
  </>
);

Layout.propTypes = {
  pageTitle: PropTypes.string.isRequired,
  metaTitle: PropTypes.string,
  metaDescription: PropTypes.string,
  children: PropTypes.node.isRequired,
  backLink: PropTypes.object,
};

Layout.defaultProps = {
  metaTitle: null,
  metaDescription: null,
  backLink: null,
};

export default Layout;
