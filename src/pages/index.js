import { Link } from 'gatsby';
import React from 'react';

import GenericPage from '../GenericPage';

export default function index() {
  return (
    <GenericPage title="Вакансии в ivelum">
      <h1>Вакансии в ivelum</h1>
      <p>
        Привет! Ниже перечислены все актуальные вакансии, которые сейчас
        открыты в <a href="https://ivelum.com">ivelum</a>. Все вакансии
        подразумевают полную занятость,{' '}
        <a href="https://github.com/ivelum/job/wiki/График-и-удаленная-работа">
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

      <p>
        <Link to="/php">
          Fullstack-разработчик (PHP + frontend)
        </Link>
      </p>
      <p>
        <Link to="/python">
          Fullstack-разработчик (Python/Django + frontend)
        </Link>
      </p>
    </GenericPage>
  )
}
