import React from 'react';

import * as styles from './Contacts.module.scss';

import { openChat } from '@/chat';
import ExternalLink from '@/components/ExternalLink';
import SvgImage from '@/components/SvgImage';

export default function Contacts() {
  return (
    <div className={styles.contacts}>
      <div className={styles.title}>
        С&nbsp;любыми вопросами, пожалуйста, пишите:
      </div>
      <div className={styles.body}>
        <div className={styles.name}><span>/</span> Чат</div>
        <div className={styles.contact}>
          <ExternalLink
            href="#"
            className={styles.link}
            onClick={(e) => {
              e.preventDefault();
              openChat();
            }}
          >
            <SvgImage name="ico-chat" className={styles.ico} />
            Написать в чат
          </ExternalLink>
        </div>
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
        <div className={styles.name}><span>/</span> Телеграм</div>
        <div className={styles.contact}>
          <ExternalLink
            href="tg://resolve?domain=IvelumBot"
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
