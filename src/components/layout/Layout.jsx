import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import * as React from 'react';

import ExternalLink from '@components/ExternalLink';
import Footer from '@components/Footer';
import * as styles from '@components/layout/Layout.module.scss';

import catImage from '@images/cat.png';
import githubLogo from '@images/github-button.svg';
import icoLongArrow from '@images/ico-long-arrow.svg';
import logoIvelum from '@images/logo.svg';

const Layout = ({ pageTitle, children, backLink }) => (
  <div className="container mt-70">
    <title>{pageTitle}</title>
    <ExternalLink
      href="https://github.com"
      className={styles.githubButton}
      noUnderline
    >
      <img src={githubLogo} alt="Fork me on GitHub" />
    </ExternalLink>
    <Link
      to="/"
      className={styles.logo}
      activeClassName={styles.logoDisabled}
    >
      <img src={logoIvelum} alt="Ivelum" />
    </Link>
    <div className="col-6 mt-60">
      <div className={styles.cat}>
        Мы занимаемся продуктовой разработкой с 2003.
        <img className={styles.catImage} src={catImage} alt="Ivelum cat" />
      </div>
    </div>
    <div className={styles.titleWrapper}>
      <h1>{pageTitle}</h1>
      {(backLink) ? (
        <Link className={styles.backLink} to={backLink.url}>
          {backLink.text}
          <img src={icoLongArrow} alt={backLink.text} />
        </Link>
      ) : null}
    </div>
    <div className={styles.content}>
      {children}
    </div>
    <Footer />
  </div>
);

Layout.propTypes = {
  pageTitle: PropTypes.string,
  children: PropTypes.node,
  backLink: PropTypes.object,
};

Layout.defaultProps = {
  children: null,
  pageTitle: null,
  backLink: null,
};

export default Layout;
