import { Link } from 'gatsby';
import React from 'react';

import ExternalLink, { ExternalLinks } from './ExternalLink';

import * as styles from './WelcomeText.module.scss';
import hiIco from '@/images/hi-ico.png';

export default function WelcomeText() {
  return (
    <div className={styles.welcome}>
      Привет!
      <img className={styles.ico} src={hiIco} alt="Привет" /><br />
      Ниже перечислены актуальные вакансии в&nbsp;
      <ExternalLink href={ExternalLinks.company.home}>ivelum</ExternalLink>.
      Все вакансии подразумевают полную занятость, удаленную работу
      и&nbsp;свободный график. Дополнительная информация:{' '}
      <Link to="/faq/">вопросы и ответы</Link>,{' '}
      <ExternalLink href={ExternalLinks.wiki.home}>Wiki</ExternalLink>{' '}
      о работе в ivelum.
    </div>
  );
}
