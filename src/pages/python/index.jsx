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
        <JobTextBlock title="О проекте">
          <p>
            Данная вакансия предполагает работу
            над одним из&nbsp;следующих проектов:
          </p>
          <ul>
            <li>
              <ExternalLink href={ExternalLinks.teamplify.home}>
                Teamplify
              </ExternalLink>
              &nbsp;&mdash; инструмент для продуктивной работы команд
              разработчиков, который мы&nbsp;изначально разработали для себя,
              а&nbsp;сейчас предлагаем как публичный продукт;
            </li>
            <li>
              Платформа нового поколения для медиа-изданий в&nbsp;Интернет.
            </li>
          </ul>
          <p>
            Посмотрите короткое видео (5&nbsp;мин)
            с&nbsp;рассказом о&nbsp;проекте:
          </p>
          <Youtube videoId="INym0k56LVc" />
        </JobTextBlock>
        <JobTextBlock title="Технологии и процессы">
          <TechLogos
            brands={['Python', 'Django', 'React', 'GraphQL', 'Docker', 'AWS']}
          />
          <p>
            Основные технологии: Python&nbsp;3.9, Django&nbsp;3.2, React.js,
            GraphQL, Docker, AWS. Все наши проекты глубоко автоматизированы,
            включая развертывание как продакшен-инфраструктуры,
            так и&nbsp;локального окружения разработки. Мы&nbsp;активно
            применяем автоматизированное тестирование, линтеры и&nbsp;code
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
              вебинар о&nbsp;том{' '}
              <ExternalLink href={ExternalLinks.webinar.continuousDeployment}>
                как мы&nbsp;предпочитаем деплоить в&nbsp;прод
              </ExternalLink>.
            </li>
          </ul>
        </JobTextBlock>
        <JobTextBlock title="О вас">
          <p>
            Мы&nbsp;ожидаем, что у&nbsp;вас не&nbsp;меньше пары лет опыта
            в&nbsp;веб-разработке и&nbsp;вы&nbsp;готовы работать как над
            бекендом, так и&nbsp;над фронтендом, и&nbsp;инфраструктурная
            часть вам также не&nbsp;чужда. Все технологии из&nbsp;нашего
            стека знать необязательно, но, как минимум, опыт
            работы с&nbsp;Python, JavaScript и&nbsp;Linux точно пригодится.
          </p>
          <p>
            Мы&nbsp;всячески приветствуем креатив, самостоятельность
            и&nbsp;открытые обсуждения. Поэтому, кроме технических скиллов,
            мы&nbsp;ожидаем, что вы&nbsp;настроены на&nbsp;командную работу,
            готовы исследовать разные варианты решения задачи, обсуждать
            их&nbsp;с&nbsp;коллегами, проектировать, принимать решения
            и&nbsp;воплощать их&nbsp;в&nbsp;жизнь.
          </p>
          <p>
            У&nbsp;нас русскоязычная команда, но&nbsp;продукты, над которыми
            мы&nbsp;работаем, имеют англоязычный интерфейс и&nbsp;рассчитаны
            на&nbsp;интернациональную аудиторию. Также мы&nbsp;активно
            общаемся с&nbsp;нашими партнерами из&nbsp;США. В&nbsp;связи
            с&nbsp;этим русский знать обязательно;
            английский&nbsp;&mdash; достаточно уровня Intermediate
            и&nbsp;готовности его улучшать (у&nbsp;нас налажено корпоративное
            обучение английскому).
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
