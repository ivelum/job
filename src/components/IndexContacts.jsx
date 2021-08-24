import React from 'react';

import * as styles from '@components/IndexContacts.module.scss';

import icoMail from '@images/ico-mail.svg';
import icoTg from '@images/ico-telegram.svg';

export default function IndexContacts() {
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
            <a
              href="mailto:job@ivelum.com"
              className={`underLined ${styles.link}`}
            >
              <img className={styles.ico} src={icoMail} alt="Mail" />
              job@ivelum.com
            </a>
          </div>
          <div className={`col-5 ${styles.name}`}>
            <span>/</span> Телеграм, Ольга
          </div>
          <div className="col-7">
            <a
              href="tg://resolve?domain=lebedevaoi"
              className={`underLined ${styles.link}`}
            >
              <img className={styles.ico} src={icoTg} alt="Mail" />
              @lebedevaoi
            </a>
          </div>
          <div className={`col-5 ${styles.name}`}>
            <span>/</span> Телеграм, Денис
          </div>
          <div className="col-7">
            <a
              href="tg://resolve?domain=stebunovd"
              className={`underLined ${styles.link}`}
            >
              <img className={styles.ico} src={icoTg} alt="Mail" />
              @stebunovd
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
