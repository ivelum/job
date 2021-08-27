import React from 'react';

import Contacts from '@/components/Contacts';
import ExternalLink from '@/components/ExternalLink';
import Layout from '@/components/layout/Layout';

export default function index() {
  return (
    <Layout pageTitle="Отклик принят!">
      <p>
        Спасибо за заполнение анкеты.
        Приглашем вас на короткое интервью, которое пройдет в аудиоформате и на
        котором мы немного больше расскажем вам о проекте, а вы сможете задать
        интересующие вопросы.
      </p>

      <p>
        Пожалуйста, выберите одну удобную вам дату и время{' '}
        <ExternalLink link="company.bookInterview">
          по ссылке
        </ExternalLink><br />
        Ссылка на Zoom-конференцию будет создана автоматически и придет вам
        на почту.
      </p>
      <Contacts />
    </Layout>
  );
}
