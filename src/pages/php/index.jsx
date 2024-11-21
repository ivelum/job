import React from 'react';

import Jobs from '@/Jobs';
import Benefits from '@/components/Benefits';
import InterviewProcess from '@/components/InterviewProcess';
import JobPage from '@/components/JobPage';
import JobTextBlock from '@/components/JobTextBlock';
import Layout from '@/components/layout/Layout';

const backLink = { url: '/', text: 'Все вакансии' };

export default function phpJob() {
  return (
    <Layout
      pageTitle={Jobs.php.title}
      subTitle={Jobs.php.subTitle}
      metaDescription={Jobs.php.description}
      backLink={backLink}
    >
      <JobPage job={Jobs.php}>
        <JobTextBlock title="О проекте">
          <p>
            Мы ищем опытного PHP / full-stack разработчика в команду
            занимающуюся поддержкой и развитием сайта ценителей вина, с
            обзорами, тестами и активным пользовательским комьюнити. В редакции
            работают профессиональные винные критики с большим опытом, авторы
            книг и обладатели наград в этой области.
          </p>
          <p>
            С технической точки зрения, это довольно старый проект,
            построенный на Drupal, который сейчас обретает новое дыхание. В нем
            хватает проблем, однако команда, недавно выкупившая проект у его
            прежних владельцев, полна решимости их решать и модернизировать
            технологии. Например, предстоит работа с платными подписками и
            возможной миграцией их на Stripe, в будущем - вероятно переделка на
            Headless CMS с переводом фронта на React / Next.js, и т.д. Планы
            большие, и мы ищем разработчика который помог бы их реализовать.
          </p>
          <p>
            Помимо данного проекта, у нас есть и другие проекты на PHP, Python
            и Node.js, и в будущем может предстоять работа и с ними.
          </p>
        </JobTextBlock>
        <JobTextBlock title="О вас">
          <p>
            Мы ожидаем, что у вас не меньше пяти лет опыта в веб-разработке и
            вы готовы работать как над бекендом, так и над фронтендом, и
            инфраструктурная часть вам также не чужда. Идеально, если помимо
            PHP вы открыты к работе с Python и Node.js в будущем.
          </p>
          <p>
            Мы всячески приветствуем креатив, самостоятельность
            и открытые обсуждения. Поэтому, кроме технических скиллов,
            мы ожидаем, что вы настроены на командную работу,
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
            английский &mdash; достаточно уровня Intermediate
            и готовности его улучшать (у нас налажено корпоративное
            обучение английскому).
          </p>
        </JobTextBlock>
        <JobTextBlock title="Условия">
          <Benefits />
        </JobTextBlock>
        <JobTextBlock title="Как проходит интервью">
          <InterviewProcess jobIsActive={Jobs.php.active} />
        </JobTextBlock>
      </JobPage>
    </Layout>
  );
}
