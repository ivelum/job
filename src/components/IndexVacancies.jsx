import { Link } from 'gatsby';
import React from 'react';

import Jobs from '@/Jobs';
import HrLine from '@/components/HrLine';
import * as styles from '@/components/IndexVacancies.module.scss';
import SvgImage from '@/components/SvgImage';

export default function IndexVacancies() {
  return (
    <div className={styles.vacancies}>
      <HrLine />
      <div className={styles.vacanciesWrapper}>
        <h2>Открытые вакансии</h2>
        <div className={styles.vacanciesList}>
          {Object.keys(Jobs).map((key, index) => (
            <Link
              className={styles.vacancyItem}
              to={Jobs[key].url}
              key={Jobs[key].url}
            >
              <span className={styles.vacancyNum}>
                {(index + 1).toLocaleString('en-US', {
                  minimumIntegerDigits: 2,
                  useGrouping: false,
                })}
              </span>
              <span className={styles.vacancyTitle}>
                {Jobs[key].title}
                <span className={styles.vacancySubTitle}>
                  {Jobs[key].subTitle}
                </span>
              </span>
              <SvgImage name="ico-angle-arrow" className={styles.vacancyIco} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
