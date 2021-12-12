import React from 'react';

import Jobs from '@/Jobs';
import Benefits from '@/components/Benefits';
import ExternalLink, { ExternalLinks } from '@/components/ExternalLink';
import InterviewProcess from '@/components/InterviewProcess';
import JobPage from '@/components/JobPage';
import JobTextBlock from '@/components/JobTextBlock';
import TechLogos from '@/components/TechLogos';
import Youtube from '@/components/Youtube';
import Layout from '@/components/layout/Layout';

const backLink = { url: '/', text: 'Все вакансии' };

export default function frontendJob() {
  return (
    <Layout
      pageTitle={Jobs.frontend.title}
      subTitle={Jobs.frontend.subTitle}
      metaDescription={Jobs.frontend.description}
      backLink={backLink}
    >
      <JobPage job={Jobs.frontend}>
        <JobTextBlock title="О проекте">
          <p>
            У нас в{' '}
            <ExternalLink href={ExternalLinks.company.home}>
              ivelum
            </ExternalLink> несколько команд, каждая из которых работает над
            своим проектом. При этом, технологический стек и применяемые
            подходы во всех командах похожи. Сейчас у нас открыто несколько
            позиций для Frontend / full-stack разработчиков на следующие два
            проекта:
          </p>
          <ul>
            <li>
              Платформа нового поколения для медиа-изданий в Интернет:
              управление контентом, работа с аудиторией, рекламой, аналитикой;
            </li>
            <li>
              Стартап по безопасности, специализирующийся на анализе
              уязвимостей в программном коде.
            </li>
          </ul>
          <p>
            Посмотрите короткое видео (~3 мин) с кратким рассказом о проектах:
          </p>
          <Youtube videoId="UqLmD9Vc9vc" />
        </JobTextBlock>
        <JobTextBlock title="Технологии и процессы">
          <TechLogos
            brands={['React', 'GraphQL', 'Next.js', 'Docker', 'Python', 'AWS']}
          />
          <p>
            Оба вышеупомянутых проекта используют React и GraphQL, на беке -
            Python, плюс на медиа-проекте также встречается PHP. Хостинг
            &mdash; в AWS, на Kubernetes или ECS. Мы используем
            автоматизированный деплой и Infrastructure-as-a-Code, применяем
            линтеры и автоматизированное тестирование, делаем код-ревью.
          </p>
        </JobTextBlock>
        <JobTextBlock title="О вас">
          <p>
            Мы ожидаем, что у вас не меньше пары лет опыта в веб-разработке,
            вы уже знакомы с React, и готовы работать не только над фронтедом,
            но и иногда заглянуть в бекенд тоже не против. Основная работа
            предстоит на фронте, однако, если для вашей задачи потребуются
            какие-то небольшие доработки на беке, мы хотели бы, чтобы вы могли
            с ними справиться самостоятельно.
          </p>
          <p>
            Мы всячески приветствуем креатив, самостоятельность и открытые
            обсуждения. Поэтому, кроме технических скиллов, мы ожидаем, что вы
            настроены на командную работу, готовы исследовать разные варианты
            решения задачи, обсуждать их с коллегами, проектировать, принимать
            решения и воплощать их в жизнь.
          </p>
          <p>
            У нас русскоязычная команда, но продукты, над которыми мы работаем,
            имеют англоязычный интерфейс и рассчитаны на интернациональную
            аудиторию. Также мы активно общаемся с нашими партнерами из США.
            В связи с этим, русский знать обязательно; английский &mdash;
            достаточно уровня Intermediate и готовности его улучшать (у нас
            налажено корпоративное обучение английскому).
          </p>
        </JobTextBlock>
        <JobTextBlock title="Условия">
          <Benefits />
        </JobTextBlock>
        <JobTextBlock title="Как проходит интервью">
          <InterviewProcess />
        </JobTextBlock>
      </JobPage>
    </Layout>
  );
}
