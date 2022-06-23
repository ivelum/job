import { Link } from 'gatsby';
import React from 'react';

import * as styles from './Header.module.scss';
import catImage from '@/images/cat.png';
import logoIvelum from '@/images/logo.svg';

export default function Header() {
  return (
    <div className={styles.header}>
      <Link
        to="/"
        className={styles.logo}
        activeClassName={styles.logoDisabled}
      >
        <img src={logoIvelum} className={styles.logoImage} alt="ivelum" />
      </Link>
      <div className={styles.cat}>
        <span className={styles.catText}>
          Занимаемся продуктовой разработкой с&nbsp;2003
        </span>
        <img className={styles.catImage} src={catImage} alt="ivelum cat" />
      </div>
    </div>
  );
}
