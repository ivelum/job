import React from 'react';

import Jobs from '@/Jobs';
import About from '@/components/About';
import Benefits from '@/components/Benefits';
import Button from '@/components/Button';
import HrLine from '@/components/HrLine';
import InterviewProcess from '@/components/InterviewProcess';
import TechLogos from '@/components/TechLogos';
import Youtube from '@/components/Youtube';
import Layout from '@/components/layout/Layout';

const backLink = { url: '/', text: 'Все вакансии' };

const phpJob = () => (
  <Layout pageTitle={Jobs.php.title} backLink={backLink}>
    <div className="row justify-content-center">
      <div className="col-12 col-xl-10">
        <About />
        <HrLine />
        <h2 className="mt-30 mt-lg-40 mt-xl-50">О проекте</h2>
        <div className="mt-20 mt-md-30">
          <p>
            Мы&nbsp;ищем разработчика в&nbsp;команду которая занимается
            разработкой и&nbsp;поддержкой новостных сайтов.
            Тематика&nbsp;&mdash; автомобили, обустройство дома,
            ремонт и&nbsp;другие. Аудитория большинства из&nbsp;них измеряется
            в&nbsp;миллионах уникальных посетителей в&nbsp;месяц.
            Мы&nbsp;трудимся совместно с&nbsp;профессиональной командой
            редакторов, дизайнеров и&nbsp;специалистов по&nbsp;рекламе.
          </p>
          <p>
            Посмотрите короткое видео (3&nbsp;мин)
            с&nbsp;рассказом о&nbsp;проекте:
          </p>
        </div>
        <Youtube videoId="EPhvHNWfmQI" />
        <h2 className="mt-30 mt-lg-40 mt-xl-50">Технологии и процессы</h2>
        <div className="mt-20 mt-md-30">
          <TechLogos
            brands={['PHP', 'Wordpress', 'Docker', 'Kubernetes', 'AWS']}
          />
          <p>
            На&nbsp;данный момент эти проекты используют Wordpress
            в&nbsp;качестве основного движка. Хостинг&nbsp;&mdash; в&nbsp;AWS
            на&nbsp;Kubernetes/EKS. Мы&nbsp;используем автоматизированный
            деплой и&nbsp;Infrastructure-as-a-Code, применяем линтеры
            и&nbsp;автоматизированное тестирование, делаем код-ревью.
          </p>
          <TechLogos
            brands={['Python', 'Django', 'React', 'Next.js']}
          />
          <p>
            Через несколько месяцев планируется миграция с&nbsp;Wordpress
            на&nbsp;новую платформу, в&nbsp;основе которой Python, Django,
            React и&nbsp;Next.js. Эта платформа сейчас активно разрабатывается
            отдельной командой и&nbsp;постепенно вводится в&nbsp;строй
            отдельными модулями.
          </p>
        </div>
        <h2 className="mt-30 mt-lg-40 mt-xl-50">О вас</h2>
        <div className="mt-20 mt-md-30">
          <p>
            Мы&nbsp;ожидаем, что у&nbsp;вас не&nbsp;меньше пары лет опыта
            в&nbsp;веб-разработке, и&nbsp;вы&nbsp;готовы работать как над
            бекендом, так и&nbsp;над фронтендом, и&nbsp;инфраструктурная
            часть вам также не&nbsp;чужда. Идеально, если вы&nbsp;уже имеете
            опыт работы с&nbsp;PHP, но&nbsp;открыты к&nbsp;работе
            с&nbsp;Python и&nbsp;Node.js в&nbsp;будущем.
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
          <Button confettiAnimation href={`${Jobs.php.url}form/`}>
            Откликнуться на вакансию
          </Button>
        </div>
      </div>
    </div>
  </Layout>
);

export default phpJob;
