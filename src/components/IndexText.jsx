import React from 'react';

import ExternalLink, { ExternalLinks } from './ExternalLink';

import * as styles from './IndexText.module.scss';
import hiIco from '@/images/hi-ico.png';

export default function IndexText() {
  return (
    <p>
      Привет!
      <img className={styles.hiIco} src={hiIco} alt="Привет" /><br />
      Ниже перечислены актуальные вакансии, которые сейчас
      открыты в&nbsp;
      <ExternalLink href={ExternalLinks.company.home}>
        Ivelum
      </ExternalLink>.
      Все вакансии подразумевают полную занятость,{' '}
      <ExternalLink href={ExternalLinks.wiki.remoteWork}>
        удаленную работу
      </ExternalLink> и&nbsp;
      <ExternalLink href={ExternalLinks.wiki.remoteWork}>
        свободный
      </ExternalLink> график. Подробную информацию о&nbsp;нас и&nbsp;о&nbsp;том,
      как мы&nbsp;работаем, вы&nbsp;можете найти в&nbsp;нашей{' '}
      <ExternalLink href={ExternalLinks.wiki.home}>Wiki</ExternalLink>.
    </p>
  );
}
