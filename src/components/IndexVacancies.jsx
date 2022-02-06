import { Link } from 'gatsby';
import React from 'react';

import HrLine from './HrLine';
import SvgImage from './SvgImage';
import Jobs from '@/Jobs';

import * as styles from './IndexVacancies.module.scss';

export default function IndexVacancies() {
  return (
    <div className={styles.vacancies}>
      <HrLine />
      <div className={styles.wrapper}>
        <h2>Открытые вакансии</h2>
        <div className={styles.list}>
          {Object.keys(Jobs).map((key, index) => (
            <Link
              className={styles.item}
              to={Jobs[key].url}
              key={Jobs[key].url}
            >
              <span className={styles.num}>
                {(index + 1).toLocaleString('en-US', {
                  minimumIntegerDigits: 2,
                  useGrouping: false,
                })}
              </span>
              <span className={styles.title}>
                {Jobs[key].title}
                <span className={styles.subTitle}>
                  {Jobs[key].subTitle}
                </span>
              </span>
              <SvgImage name="ico-angle-arrow" className={styles.ico} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
