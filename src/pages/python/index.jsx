import React from 'react';

import Jobs from '../../Jobs';
import About from '@components/About';
import Benefits from '@components/Benefits';
import Button from '@components/Button';
import ExternalLink from '@components/ExternalLink';
import HrLine from '@components/HrLine';
import InterviewProcess from '@components/InterviewProcess';
import TechLogos from '@components/TechLogos';
import Youtube from '@components/Youtube';
import Layout from '@components/layout/Layout';

const backLink = { url: '/', text: 'Все вакансии' };

const pythonJob = () => (
  <Layout pageTitle={Jobs.python.title} backLink={backLink}>
    <div className="row justify-content-center">
      <div className="col-12 col-xl-10">
        <About />
        <HrLine />
        <h2 className="mt-30 mt-lg-40 mt-xl-50">О проекте</h2>
        <div className="mt-20 mt-md-30">
          <p>
            Данная вакансия предполагает работу
            над одним из&nbsp;следующих проектов:
          </p>
          <ul className="mt-20 mt-md-30">
            <li>
              <ExternalLink link="teamplify.home">Teamplify</ExternalLink>
              &nbsp;&mdash; инструмент для продуктивной работы команд
              разработчиков, который мы&nbsp;изначально разработали для себя,
              а&nbsp;сейчас предлагаем как публичный продукт;
            </li>
            <li>
              Платформа нового поколения для медиа-изданий в&nbsp;Интернет.
            </li>
          </ul>
          <p className="mt-20 mt-md-30">
            Посмотрите короткое видео (5&nbsp;мин)
            с&nbsp;рассказом о&nbsp;проекте:
          </p>
        </div>
        <Youtube videoId="INym0k56LVc" />
        <h2 className="mt-30 mt-lg-40 mt-xl-50">Технологии и процессы</h2>
        <div className="mt-20 mt-md-30">
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
          <ul className="mt-20 mt-md-30">
            <li>
              более полный {' '}
              <ExternalLink link="wiki.technology">
                список технологий
              </ExternalLink> в&nbsp;нашей вики;
            </li>
            <li>
              {/* eslint-disable-next-line max-len */}
              вебинар о&nbsp;том{' '}
              <ExternalLink link="webinar.continuousDeployment">
                как мы&nbsp;предпочитаем деплоить в&nbsp;прод
              </ExternalLink>
            </li>
          </ul>
        </div>
        <h2 className="mt-30 mt-lg-40 mt-xl-50">О вас</h2>
        <div className="mt-20 mt-md-30">
          <p>
            Мы&nbsp;ожидаем, что у&nbsp;вас не&nbsp;меньше пары лет опыта
            в&nbsp;веб-разработке, и&nbsp;вы&nbsp;готовы работать как над
            бекендом, так и&nbsp;над фронтендом, и&nbsp;инфраструктурная
            часть вам также не&nbsp;чужда. Все технологии из&nbsp;нашего
            стека знать необязательно, но, как минимум, опыт
            работы с&nbsp;Python, JavaScript и&nbsp;Linux точно пригодится.
          </p>
          <p>
            Мы&nbsp;всячески приветствуем креатив, самостоятельность
            и&nbsp;открытые обсуждения. Поэтому, кроме технических скиллов,
            мы&nbsp;ожидаем что вы&nbsp;настроены на&nbsp;командную работу,
            готовы исследовать разные варианты решения задачи, обсуждать
            их&nbsp;с&nbsp;коллегами, проектировать, принимать решения
            и&nbsp;воплощать их&nbsp;в&nbsp;жизнь.
          </p>
          <p>
            У&nbsp;нас русскоязычная команда, но&nbsp;продукты, над которыми
            мы&nbsp;работаем, имеют англоязычный интерфейс и&nbsp;рассчитаны
            на&nbsp;интернациональную аудиторию. Также мы&nbsp;активно
            общаемся с&nbsp;нашими партнерами из&nbsp;США. В&nbsp;связи
            с&nbsp;этим, русский знать обязательно;
            английский&nbsp;&mdash; достаточно уровня Intermediate
            и&nbsp;готовности его улучшать (у&nbsp;нас налажено корпоративное
            обучение английскому).
          </p>
        </div>
        <Benefits />
        <InterviewProcess />
        <HrLine />
        <div className="mt-40 mt-xl-50 d-flex flex-column flex-sm-row">
          <Button confettiAnimation href={`${Jobs.python.url}form/`}>
            Откликнуться на вакансию
          </Button>
        </div>
      </div>
    </div>
  </Layout>
);

export default pythonJob;
