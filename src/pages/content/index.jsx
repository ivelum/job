import React from 'react';

import Jobs from '@/Jobs';
import Benefits from '@/components/Benefits';
import ExternalLink, { ExternalLinks } from '@/components/ExternalLink';
import JobPage from '@/components/JobPage';
import JobTextBlock from '@/components/JobTextBlock';
import Layout from '@/components/layout/Layout';

const backLink = { url: '/', text: 'Все вакансии' };

export default function marketingJob() {
  return (
    <Layout
      pageTitle={Jobs.marketing.title}
      subTitle={Jobs.marketing.subTitle}
      metaDescription={Jobs.marketing.description}
      backLink={backLink}
    >
      <JobPage job={Jobs.marketing}>
        <JobTextBlock title="Кого мы ищем">
          <p>
            Нам нужен человек который помог бы нам создавать и распространять
            качественный контент по теме разработки софта и управления ей.
            Это могут быть статьи, видео, выступления с докладами на
            конференциях и любой другой креативный движ. Весь контент будет
            так или иначе связан с нашими{' '}
            <ExternalLink href={ExternalLinks.company.home}>
              услугами по заказной разработке
            </ExternalLink> и{' '}
            <ExternalLink href={ExternalLinks.teamplify.home}>
              продуктом для управления командами разработчиков
            </ExternalLink>.
          </p>
          <p>
            Мы ожидаем:
          </p>
          <ul>
            <li>опыт работы в этой сфере от 5 лет;</li>
            <li>
              хорошее знание русского и английского, безупречная грамотность;
            </li>
            <li>
              вы можете самостоятельно (без ChatGPT) написать интересную статью
              по IT-тематике, или помочь отредактировать статью которую написал
              другой человек;
            </li>
            <li>
              вы знаете как сделать чтобы ваше творчество увидело большое
              количество людей;
            </li>
            <li>
              если у вас также есть опыт работы с видео - вообще замечательно 🙂
            </li>
          </ul>
        </JobTextBlock>
        <JobTextBlock title="Условия">
          <Benefits />
        </JobTextBlock>
      </JobPage>
    </Layout>
  );
}
