import { Link } from 'gatsby';
import React from 'react';

import Jobs from '@/Jobs';
import HrLine from '@/components/HrLine';
import * as styles from '@/components/IndexVacancies.module.scss';
import SvgImage from '@/components/SvgImage';

export default function IndexVacancies() {
  return (
    <>
      <HrLine />
      <h2 className="mt-30 mt-lg-40 mt-xl-50">Открытые вакансии</h2>
      <div className={styles.vacanciesList}>
        {Object.keys(Jobs).map((key, index) => (
          <Link
            className={styles.vacancyItem}
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
              <span className={styles.subTitle}>{Jobs[key].subTitle}</span>
            </span>
            <SvgImage name="ico-angle-arrow" className={styles.ico} />
          </Link>
        ))}
      </div>
    </>
  );
}
