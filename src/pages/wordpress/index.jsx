import React from 'react';

import Jobs from '@/Jobs';
import Benefits from '@/components/Benefits';
import InterviewProcess from '@/components/InterviewProcess';
import JobPage from '@/components/JobPage';
import JobTextBlock from '@/components/JobTextBlock';
import Layout from '@/components/layout/Layout';

const backLink = { url: '/', text: 'Все вакансии' };

export default function wordpressJob() {
  return (
    <Layout
      pageTitle={Jobs.wordpress.title}
      subTitle={Jobs.wordpress.subTitle}
      metaDescription={Jobs.wordpress.description}
      backLink={backLink}
    >
      <JobPage job={Jobs.wordpress}>
        <JobTextBlock title="О проекте">
          <p>
            Мы ищем опытного PHP / full-stack разработчика в команду,
            занимающуюся поддержкой и развитием сайтов крупного медиа-холдинга.
            Суммарная посещаемость сайтов - более 70 млн. уникальных посетителей
            в месяц; тематики - автомобили, обустройство дома, популярная наука,
            фотография, и т.д.
          </p>
          <p>
            Все эти сайты построены на WordPress, и нас часто спрашивают - не
            планируем ли мы переписать их на что-то другое. Нет, не планируем 🙂
            WordPress, как платформа, разумеется имеет свои известные
            ограничения, но несмотря на это является стандартом де-факто среди
            профессиональных медиа-издателей. Слияния и поглощения в этой
            индустрии происходят регулярно, и по статистике 2/3 из новых сайтов
            которыми пополняется портфолио холдинга оказываются построены на
            WordPress, и попытки противостоять этому тренду просто
            нецелесообразны.
          </p>
          <p>
            Заметим, однако, что у нас не &quot;дикий&quot; WordPress, а очень
            даже культурный - с CI-пайплайнами, код-стайлом, линтерами и
            автоматизированными тестами. Мы проводим код-ревью и стараемся
            следовать прочим инженерным best practices.
          </p>
          <p>
            У нас есть и другие проекты на PHP, Python
            и Node.js, в будущем может предстоять работа и с ними.
          </p>
        </JobTextBlock>
        <JobTextBlock title="О вас">
          <p>
            Мы ожидаем, что у вас не меньше пяти лет опыта в веб-разработке,
            включая практический опыт с WordPress, и вы готовы работать как над
            бекендом, так и над фронтендом, инфраструктурная часть вам также
            не чужда. Идеально, если помимо PHP, вы открыты к работе с Python
            и Node.js в будущем.
          </p>
          <p>
            Мы всячески приветствуем креатив, самостоятельность
            и открытые обсуждения. Поэтому кроме технических скиллов,
            ожидаем, что вы настроены на командную работу,
            готовы исследовать разные варианты решения задачи, обсуждать
            их с коллегами, проектировать, принимать решения
            и воплощать их в жизнь.
          </p>
          <p>
            У нас русскоязычная команда, но продукты, над которыми
            мы работаем, имеют англоязычный интерфейс и рассчитаны
            на интернациональную аудиторию. Также мы активно
            общаемся с нашими партнерами из США. В связи
            с этим русский знать обязательно;
            а для английского &mdash; достаточно уровня Intermediate
            и готовности его улучшать (у нас налажено корпоративное
            обучение английскому).
          </p>
        </JobTextBlock>
        <JobTextBlock title="Условия">
          <Benefits />
        </JobTextBlock>
        <JobTextBlock title="Как проходит интервью">
          <InterviewProcess jobIsActive={Jobs.wordpress.active} />
        </JobTextBlock>
      </JobPage>
    </Layout>
  );
}
