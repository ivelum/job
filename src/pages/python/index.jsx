import React from 'react';

import ExternalLinks from '../../ExternalLinks';
import Jobs from '../../Jobs';
import About from '@components/About';
import Benefits from '@components/Benefits';
import InterviewProcess from '@components/InterviewProcess';
import JobPage from '@components/JobPage';
import Youtube from '@components/Youtube';

export default function index() {
  return (
    <JobPage job={Jobs.python}>
      <About />

      <h2>О проекте</h2>
      <p>
        Данная вакансия предполагает работу над одним из следующих проектов:
      </p>
      <ul>
        <li>
          <a href="https://teamplify.com">Teamplify</a> - инструмент для
          продуктивной работы команд разработчиков, который мы изначально
          разработали для себя, а сейчас предлагаем как публичный продукт;
        </li>
        <li>
          Платформа нового поколения для медиа-изданий в Интернет.
        </li>
      </ul>

      <p>
        Посмотрите короткое видео (5 мин) с рассказом о проекте:
      </p>
      <Youtube videoId="INym0k56LVc" />

      <h2>Технологии и процессы</h2>
      <p>
        Основные технологии: Python 3.9, Django 3.2, React.js, GraphQL, Docker,
        AWS. Все наши проекты глубоко автоматизированы, включая развертывание
        как продакшен-инфраструктуры, так и локального окружения разработки.
        Мы активно применяем автоматизированное тестирование, линтеры и code
        review. См. также:
      </p>
      <ul>
        <li>
          более полный{' '}
          <a href={ExternalLinks.wiki.technology}>список технологий</a> в
          нашей вики;
        </li>
        <li>
          вебинар о том{' '}
          <a href={ExternalLinks.webinar.continuousDeployment}>
            как мы предпочитаем деплоить в прод
          </a>.
        </li>
      </ul>

      <h2>О вас</h2>
      <p>
        Мы ожидаем, что у вас не меньше пары лет опыта в веб-разработке, и вы
        готовы работать как над бекендом, так и над фронтендом, и
        инфраструктурная часть вам также не чужда. Все технологии из нашего
        стека знать необязательно, но, как минимум, опыт работы с Python,
        JavaScript и Linux точно пригодится.
      </p>
      <p>
        Мы всячески приветствуем креатив, самостоятельность и открытые
        обсуждения. Поэтому, кроме технических скиллов, мы ожидаем что вы
        настроены на командную работу, готовы исследовать разные варианты
        решения задачи, обсуждать их с коллегами, проектировать, принимать
        решения и воплощать их в жизнь.
      </p>
      <p>
        У нас русскоязычная команда, но продукты, над которыми мы работаем,
        имеют англоязычный интерфейс и рассчитаны на интернациональную
        аудиторию. Также мы активно общаемся с нашими партнерами из США.
        В связи с этим, русский знать обязательно; английский - достаточно
        уровня Intermediate и готовности его улучшать (у нас налажено
        корпоративное обучение английскому).
      </p>

      <Benefits />

      <InterviewProcess />
    </JobPage>
  );
}
