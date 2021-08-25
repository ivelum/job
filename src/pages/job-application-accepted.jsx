import React from 'react';

import ExternalLink from '@components/ExternalLink';
import GenericPage from '@components/GenericPage';

export default function index() {
  return (
    <GenericPage title="Отклик принят!">
      <h1>Ваш отклик принят!</h1>

      <p>
        Спасибо за заполнение анкеты.
        Приглашем вас на короткое интервью, которое пройдет в аудиоформате и на
        котором мы немного больше расскажем вам о проекте, а вы сможете задать
        интересующие вопросы.
      </p>

      <p>
        Пожалуйста, выберите одну удобную вам дату и время по ссылке:<br />
        <ExternalLink link="company.bookInterview">
          https://calendly.com/alexandr-strokach/developer-job-interview
        </ExternalLink><br />
        Ссылка на Zoom-конференцию будет создана автоматически и придет вам
        на почту.
      </p>

      <p>
        С любыми вопросами, пожалуйста, пишите:
      </p>
      <ul>
        <li>
          Почта: <a href="mailto:job@ivelum.com">job@ivelum.com</a>
        </li>
        <li>
          Telegram:
          Ольга - <a href="tg://resolve?domain=lebedevaoi">@lebedevaoi</a>,
          Денис - <a href="tg://resolve?domain=stebunovd">@stebunovd</a>.
        </li>
      </ul>
    </GenericPage>
  );
}
