import { Link } from 'gatsby';
import React from 'react';

import ExternalLink, { ExternalLinks } from './ExternalLink';

import * as styles from './WelcomeText.module.scss';
import hiIco from '@/images/hi-ico.png';

export default function WelcomeText() {
  return (
    <div className={styles.welcome}>
      Привет!
      <img className={styles.ico} src={hiIco} alt="Привет" />{' '}
      Ниже перечислены актуальные вакансии, которые сейчас
      открыты в{' '}
      <ExternalLink href={ExternalLinks.company.home}>
        ivelum
      </ExternalLink>. Дополнительная информация:
      <ul>
        <li>
          <Link to="/faq/">Вопросы и ответы</Link>
        </li>
        <li>
          <ExternalLink href={ExternalLinks.wiki.home}>
            Wiki о работе в ivelum
          </ExternalLink>
        </li>
      </ul>
    </div>
  );
}
