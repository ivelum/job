import { Link } from 'gatsby';
import React from 'react';

import ExternalLinks from '../ExternalLinks';
import Jobs from '../Jobs';
import GenericPage from '@components/GenericPage';

export default function index() {
  return (
    <GenericPage title="Работа в ivelum">
      <h1>Работа в ivelum</h1>
      <p>
        Привет! Ниже перечислены все актуальные вакансии, которые сейчас
        открыты в <a href={ExternalLinks.home}>ivelum</a>. Все вакансии
        подразумевают полную занятость,{' '}
        <a href={ExternalLinks.wiki.remoteWork}>
          удаленную работу и свободный график
        </a>. Подробную информацию о нас и о том как мы работаем вы можете
        найти в нашей{' '}
        <a href="https://github.com/ivelum/job/wiki/Home-RU">вики</a>.
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

      <h2>Открытые вакансии</h2>
      {Object.keys(Jobs).map((key) => (
        <p key={Jobs[key].url}>
          <Link to={Jobs[key].url}>{Jobs[key].title}</Link>
        </p>
      ))}
    </GenericPage>
  );
}
