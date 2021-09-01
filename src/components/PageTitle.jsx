import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import * as React from 'react';

import * as styles from '@/components/PageTitle.module.scss';
import SvgImage from '@/components/SvgImage';

export default function PageTitle({ title, subTitle, backLink }) {
  return (
    <div className={styles.title}>
      {!!backLink && (
      <Link className={styles.backLink} to={backLink.url}>
        {backLink.text}
        <SvgImage name="ico-long-arrow" className={styles.backLinkIco} />
      </Link>
      )}
      <div className={styles.titleBody}>
        <h1>{title}</h1>
        {!!subTitle && (<div className={styles.titleSub}>{subTitle}</div>)}
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
