import React from 'react';

import ExternalLink from '@components/ExternalLink';
import SvgImage from '@components/SvgImage';

import * as styles from './Contacts.module.scss';

export default function Contacts() {
  return (
    <div className={styles.contacts}>
      <div className={styles.title}>
        С&nbsp;любыми вопросами, пожалуйста, пишите:
      </div>
      <div className={styles.body}>
        <div className={styles.name}><span>/</span> Почта</div>
        <div className={styles.contact}>
          <ExternalLink
            href="mailto:job@ivelum.com"
            className={styles.link}
          >
            <SvgImage name="ico-mail" className={styles.ico} />
            job@ivelum.com
          </ExternalLink>
        </div>
        <div className={styles.name}><span>/</span> Телеграм, Ольга</div>
        <div className={styles.contact}>
          <ExternalLink
            href="tg://resolve?domain=lebedevaoi"
            className={styles.link}
          >
            <SvgImage name="ico-telegram" className={styles.ico} />
            @lebedevaoi
          </ExternalLink>
        </div>
        <div className={styles.name}><span>/</span> Телеграм, Денис</div>
        <div className={styles.contact}>
          <ExternalLink
            href="tg://resolve?domain=stebunovd"
            className={styles.link}
          >
            <SvgImage name="ico-telegram" className={styles.ico} />
            @stebunovd
          </ExternalLink>
        </div>
      </div>
    </div>
  );
}
