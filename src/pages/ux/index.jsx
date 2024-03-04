import React from 'react';

import Jobs from '@/Jobs';
import Benefits from '@/components/Benefits';
import ExternalLink, { ExternalLinks } from '@/components/ExternalLink';
import JobPage from '@/components/JobPage';
import JobTextBlock from '@/components/JobTextBlock';
import Layout from '@/components/layout/Layout';

const backLink = { url: '/', text: 'Все вакансии' };

export default function uxJob() {
  return (
    <Layout
      pageTitle={Jobs.ux.title}
      subTitle={Jobs.ux.subTitle}
      metaDescription={Jobs.ux.description}
      backLink={backLink}
    >
      <JobPage job={Jobs.ux}>
        <JobTextBlock title="О проекте">
          <p>
            <ExternalLink href={ExternalLinks.teamplify.home}>
              Teamplify
            </ExternalLink> - инструмент для управления командами разработчиков,
            помогающий улучшить прозрачность работы, упростить отчетность и
            экономить время на статус-митингах. Teamplify родился как внутренний
            проект компании, изначально мы использовали его только для своих
            команд. Он хорошо работал для нас, и в какой-то момент мы решили
            превратить его в публичный продукт и выпустить на рынок.
          </p>
        </JobTextBlock>
        <JobTextBlock title="О вас">
          <p>
            Мы ищем опытного продуктового дизайнера для Teamplify. Мы ожидаем,
            что вы отлично разбираетесь в UX, умеете анализировать потребности
            пользователей и предлагать удобные и красивые решения, и занимаетесь
            этим уже как минимум несколько лет. Понимание того, как происходит
            разработка ПО, будет большим плюсом, так как наш продукт
            предназначен для команд разработчиков.
          </p>
          <p>
            Также мы ценим хорошие коммуникативные навыки - конструктивные
            обсуждения, умение понятно и грамотно изложить свою мысль, и устно,
            и письменно, причем как на русском, так и на английском. У нас
            русскоязычная команда, но продукт имеет англоязычный интерфейс и
            ориентирован на интернациональную аудиторию. Общение с большинством
            клиентов происходит на английском. Поэтому русский и английский
            знать обязательно. Английский можем помочь подтянуть – у нас
            налажено корпоративное обучение ему; однако, ваш собственный
            уровень на момент начала работы должен быть не ниже среднего.
          </p>
        </JobTextBlock>
        <JobTextBlock title="Условия">
          <Benefits />
        </JobTextBlock>
      </JobPage>
    </Layout>
  );
}
