import React from 'react';

import { openChat } from '@/chat';
import ExternalLink, { ExternalLinks } from '@/components/ExternalLink';
import SvgImage from '@/components/SvgImage';

import * as styles from './Contacts.module.scss';

export default function Contacts() {
  return (
    <div className={styles.contacts}>
      <div className={styles.caption}>
        С&nbsp;любыми вопросами, пожалуйста, пишите:
      </div>
      <div className={styles.list}>
        <div className={styles.name}><span>/</span> Чат</div>
        <div className={styles.val}>
          <ExternalLink
            href="#"
            className={styles.link}
            onClick={(e) => {
              e.preventDefault();
              openChat();
            }}
          >
            <SvgImage name="ico-chat" className={styles.ico} />
            Открыть чат
          </ExternalLink>
        </div>
        <div className={styles.name}><span>/</span> Почта</div>
        <div className={styles.val}>
          <ExternalLink
            href={ExternalLinks.contacts.email}
            className={styles.link}
          >
            <SvgImage name="ico-mail" className={styles.ico} />
            job@ivelum.com
          </ExternalLink>
        </div>
        <div className={styles.name}><span>/</span> Телеграм</div>
        <div className={styles.val}>
          <ExternalLink
            href={ExternalLinks.contacts.telegram}
            className={styles.link}
          >
            <SvgImage name="ico-telegram" className={styles.ico} />
            @ivelum
          </ExternalLink>
        </div>
      </div>
    </div>
  );
}
