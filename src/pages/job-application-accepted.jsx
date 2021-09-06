import React from 'react';

import Contacts from '@/components/Contacts';
import ExternalLink, { ExternalLinks } from '@/components/ExternalLink';
import Row from '@/components/Row';
import Layout from '@/components/layout/Layout';

export default function index() {
  return (
    <Layout pageTitle="Отклик принят!">
      <p>
        Спасибо за&nbsp;заполнение анкеты.
        Приглашем вас на&nbsp;короткое интервью, которое
        пройдет в&nbsp;аудиоформате и&nbsp;на котором мы&nbsp;немного
        больше расскажем вам о&nbsp;проекте, а&nbsp;вы&nbsp;сможете задать
        интересующие вопросы.
      </p>
      <p>
        Пожалуйста, выберите одну удобную вам дату и&nbsp;время по ссылке:<br />
        <ExternalLink href={ExternalLinks.company.bookInterview}>
          {ExternalLinks.company.bookInterview}
        </ExternalLink><br />
        Ссылка на&nbsp;Zoom-конференцию будет создана
        автоматически и&nbsp;придет вам на&nbsp;почту.
      </p>
      <Row>
        <Contacts />
      </Row>
    </Layout>
  );
}
