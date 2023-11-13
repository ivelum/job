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
            подходы во всех командах похожи. Сейчас у нас открыта
            позиция для Frontend / full-stack разработчика в проект платформы
            для медиа-изданий в Интернет, которая интегрирует работу с
            контентом, рекламой, аудиторией и аналитикой. Помимо этого, у нас
            есть и другие проекты - в области информационной безопасности,
            медицины, онлайн-обучения, и управления персоналом &mdash; в будущем
            возможен переход в одну из этих команд.
          </p>
          <p>
            Посмотрите короткое видео (3&nbsp;мин) с кратким обзорным
            рассказом о вакансии:
          </p>
          <Youtube videoId="1nARwPKSAGk" />
        </JobTextBlock>
        <JobTextBlock title="Технологии и процессы">
          <TechLogos
            brands={[
              'React',
              'GraphQL',
              'Next.js',
              'Python',
              'PHP',
              'Docker',
              'AWS',
            ]}
          />
          <p>
            В своих проектах мы используем React и GraphQL, на беке может быть
            Next.js, Python или PHP. Хостинг &mdash; в AWS, на Kubernetes или
            ECS. Все наши проекты глубоко автоматизированы, включая
            развертывание как продакшен-инфраструктуры, так и локального
            окружения разработки. Мы активно применяем автоматизированное
            тестирование, линтеры и code review. См. также:
          </p>
          <ul>
            <li>
              более полный {' '}
              <ExternalLink href={ExternalLinks.wiki.technology}>
                список технологий
              </ExternalLink> в&nbsp;нашей вики;
            </li>
            <li>
              <ExternalLink href={ExternalLinks.teamplify.blog}>
                блог Teamplify
              </ExternalLink> со статьями о технологиях и менеджменте;
            </li>
            <li>
              наш{' '}
              <ExternalLink href={ExternalLinks.youtube.techTalkVideos}>
                канал&nbsp;на&nbsp;YouTube
              </ExternalLink>.
            </li>
          </ul>
        </JobTextBlock>
        <JobTextBlock title="О вас">
          <p>
            Мы ожидаем, что у вас несколько лет опыта в веб-разработке,
            вы отлично знаете React, и готовы работать не только над фронтедом,
            но и иногда заглянуть в бекенд тоже не против. Основная работа
            предстоит на фронте, однако, если для вашей задачи потребуются
            какие-то небольшие доработки на беке, мы хотели бы, чтобы вы могли
            с ними справиться самостоятельно. Если в будущем вы захотите
            перейти на позицию, в которой будет еще больший процент бекенда,
            мы будем это только приветствовать.
          </p>
          <p>
            Также, мы всячески приветствуем креатив, самостоятельность и
            открытые обсуждения. Поэтому, кроме технических скиллов, мы ожидаем,
            что вы настроены на командную работу, готовы исследовать разные
            варианты решения задачи, обсуждать их с коллегами, проектировать,
            принимать решения и воплощать их в жизнь.
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
          <InterviewProcess jobIsActive={Jobs.frontend.active} />
        </JobTextBlock>
      </JobPage>
    </Layout>
  );
}
