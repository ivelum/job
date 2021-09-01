import React from 'react';

import * as styles from './Contacts.module.scss';

import { openChat } from '@/chat';
import ExternalLink, { ExternalLinks } from '@/components/ExternalLink';
import SvgImage from '@/components/SvgImage';

export default function Contacts() {
  return (
    <div className={styles.contacts}>
      <div className={styles.contactsTitle}>
        С&nbsp;любыми вопросами, пожалуйста, пишите:
      </div>
      <div className={styles.list}>
        <div className={styles.listName}><span>/</span> Чат</div>
        <div className={styles.listVal}>
          <ExternalLink
            href="#"
            className={styles.listLink}
            onClick={(e) => {
              e.preventDefault();
              openChat();
            }}
          >
            <SvgImage name="ico-chat" className={styles.listIco} />
            Открыть чат
          </ExternalLink>
        </div>
        <div className={styles.listName}><span>/</span> Почта</div>
        <div className={styles.listVal}>
          <ExternalLink
            href={ExternalLinks.contacts.email}
            className={styles.listLink}
          >
            <SvgImage name="ico-mail" className={styles.listIco} />
            job@ivelum.com
          </ExternalLink>
        </div>
        <div className={styles.listName}><span>/</span> Телеграм</div>
        <div className={styles.listVal}>
          <ExternalLink
            href={ExternalLinks.contacts.telegram}
            className={styles.listLink}
          >
            <SvgImage name="ico-telegram" className={styles.listIco} />
            @ivelum
          </ExternalLink>
        </div>
      </div>
    </div>
  );
}
