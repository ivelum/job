import React from 'react';

import Contacts from '@/components/Contacts';
import ExternalLink, { ExternalLinks } from '@/components/ExternalLink';
import Row from '@/components/Row';
import Layout from '@/components/layout/Layout';

export default function index() {
  return (
    <Layout pageTitle="Отклик принят!">
      <p>
        Спасибо за заполнение анкеты.
        Приглашаем вас на короткое ознакомительное интервью (15 мин), на
        котором вы сможете задать все интересующие вас вопросы о вакансии,
        а мы немного узнаем о вас.
      </p>
      <p>
        Пожалуйста, выберите одну удобную вам дату и время по ссылке:<br />
        <ExternalLink href={ExternalLinks.company.bookInterview}>
          {ExternalLinks.company.bookInterview}
        </ExternalLink><br />
        Ссылка на Zoom-конференцию будет создана
        автоматически и придет вам на почту.
      </p>
      <Row>
        <Contacts />
      </Row>
    </Layout>
  );
}
