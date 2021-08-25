import React from 'react';

import ExternalLink from '@components/ExternalLink';

import * as styles from './Contacts.module.scss';
import icoMail from '@images/ico-mail.svg';
import icoTg from '@images/ico-telegram.svg';

export default function Contacts() {
  return (
    <div className={styles.contacts}>
      <div className={styles.title}>
        С&nbsp;любыми вопросами, пожалуйста, пишите:
      </div>
      <div className={styles.body}>
        <div className="row">
          <div className={`col-5 ${styles.name}`}>
            <span>/</span> Почта
          </div>
          <div className="col-7">
            <ExternalLink href="mailto:job@ivelum.com" className={styles.link}>
              <img className={styles.ico} src={icoMail} alt="Mail" />
              job@ivelum.com
            </ExternalLink>
          </div>
          <div className={`col-5 ${styles.name}`}>
            <span>/</span> Телеграм, Ольга
          </div>
          <div className="col-7">
            <ExternalLink
              href="tg://resolve?domain=lebedevaoi"
              className={styles.link}
            >
              <img className={styles.ico} src={icoTg} alt="TG lebedevaoi" />
              @lebedevaoi
            </ExternalLink>
          </div>
          <div className={`col-5 ${styles.name}`}>
            <span>/</span> Телеграм, Денис
          </div>
          <div className="col-7">
            <ExternalLink
              href="tg://resolve?domain=stebunovd"
              className={styles.link}
            >
              <img className={styles.ico} src={icoTg} alt="TG stebunovd" />
              @stebunovd
            </ExternalLink>
          </div>
        </div>
      </div>
    </div>
  );
}
