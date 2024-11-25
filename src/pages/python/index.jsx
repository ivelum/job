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

export default function pythonJob() {
  return (
    <Layout
      pageTitle={Jobs.python.title}
      subTitle={Jobs.python.subTitle}
      metaDescription={Jobs.python.description}
      backLink={backLink}
    >
      <JobPage job={Jobs.python}>
        <JobTextBlock title="О проектах">
          <p>
            У нас в{' '}
            <ExternalLink href={ExternalLinks.company.home}>
              ivelum
            </ExternalLink> несколько команд, каждая из которых работает над
            своим проектом. Технологический стек и применяемые
            подходы в них похожи. Сейчас у нас открыты позиции для
            Python / full-stack разработчиков в разные команды и проекты,
            например:
          </p>
          <ul>
            <li>
              <ExternalLink href={ExternalLinks.teamplify.home}>
                Teamplify
              </ExternalLink>
              &nbsp;&mdash; помощник для команд разработки, помогающий
              улучшить прозрачность работы, упростить отчетность и
              экономить время на статус-митингах;
            </li>
            <li>
              AI в медицине &mdash; помощь в коммуникации с пациентом перед и
              после приема в клинике;
            </li>
            <li>
              Платформа для профессиональных медиа-изданий &mdash;
              управление контентом, работа с аудиторией, рекламой, аналитикой;
            </li>
            <li>
              Платформа для обеспечения безопасности программных
              продуктов &mdash; анализ уязвимостей и рисков, интеграция мер
              по безопасности в процесс разработки ПО;
            </li>
            <li>
              ... и другие. Пока вы читаете эту вакансию, мы ведем переговоры
              о старте еще двух проектов, которые могут начаться в самом
              ближайшем будущем.
            </li>
          </ul>
          <p>
            Посмотрите короткое видео (4&nbsp;мин)
            с рассказом о вакансии:
          </p>
          <Youtube videoId="DUbe_5_SUd0" />
        </JobTextBlock>
        <JobTextBlock title="Технологии и процессы">
          <TechLogos
            brands={['Python', 'Django', 'React', 'GraphQL', 'Docker', 'AWS']}
          />
          <p>
            Основные технологии: Python и Django последних версий, React.js,
            GraphQL, Docker, AWS. Все наши проекты глубоко автоматизированы,
            включая развертывание как продакшен-инфраструктуры,
            так и локального окружения разработки. Мы активно
            применяем автоматизированное тестирование, линтеры и code
            review. См. также:
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
            Мы ожидаем, что у вас несколько лет опыта в веб-разработке, вы
            готовы работать как над бекендом, так и над фронтендом,
            инфраструктурная часть вам также не чужда. Все технологии из
            нашего стека знать необязательно, но, как минимум, опыт
            работы с Python, JavaScript и Linux точно пригодится.
          </p>
          <p>
            Мы всячески приветствуем креатив, самостоятельность и открытые
            обсуждения. Поэтому кроме технических скиллов, ожидаем, что
            вы настроены на командную работу, готовы исследовать разные
            варианты решения задачи, обсуждать их с коллегами, проектировать,
            принимать решения и воплощать их в жизнь.
          </p>
          <p>
            У нас русскоязычная команда, но продукты, над которыми мы
            работаем, имеют англоязычный интерфейс и рассчитаны на
            интернациональную аудиторию. Также мы активно общаемся с
            нашими партнерами из США. В связи с этим русский знать обязательно,
            а для английского &mdash; достаточно уровня Intermediate
            и готовности его улучшать (у нас налажено корпоративное
            обучение английскому).
          </p>
        </JobTextBlock>
        <JobTextBlock title="Условия">
          <Benefits />
        </JobTextBlock>
        <JobTextBlock title="Как проходит интервью">
          <InterviewProcess jobIsActive={Jobs.python.active} />
        </JobTextBlock>
      </JobPage>
    </Layout>
  );
}
