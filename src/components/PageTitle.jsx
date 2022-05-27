import cn from 'classnames';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import * as React from 'react';

import SvgImage from './SvgImage';

import * as styles from './PageTitle.module.scss';

export default function PageTitle({ title, subTitle, backLink }) {
  return (
    <div className={styles.title}>
      {!!backLink && (
      <Link className={cn(styles.backLink, 'noUnderline')} to={backLink.url}>
        {backLink.text}
        <SvgImage name="ico-long-arrow" className={styles.backLinkIco} />
      </Link>
      )}
      <div className={styles.body}>
        <h1>{title}</h1>
        {!!subTitle && (<div className={styles.subTitle}>{subTitle}</div>)}
      </div>
    </div>
  );
}

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string,
  backLink: PropTypes.object,
};

PageTitle.defaultProps = {
  subTitle: null,
  backLink: null,
};
