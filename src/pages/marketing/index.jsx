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
            Нам нужен человек который помог бы нам расти по обоим нашим
            направлениям &mdash; как по{' '}
            <ExternalLink href={ExternalLinks.company.home}>
              услугам по заказной разработке
            </ExternalLink>, так и{' '}
            <ExternalLink href={ExternalLinks.teamplify.home}>
              продукту для управления командами разработчиков
            </ExternalLink>. Основную ставку мы хотим сделать на
            контент-маркетинг, но также открыты и к другим направлениям &mdash;
            SMM, рекламе, SEO, итд.
          </p>
          <p>
            Мы ожидаем, что у вас есть опыт в маркетинге (от 5 лет) и вам
            близка сфера IT. Также потребуются отличные коммуникативные навыки.
            Мы ожидаем, что вы умеете четко и грамотно излагать свою мысль,
            как устно так и письменно, на русском и английском.
          </p>
        </JobTextBlock>
        <JobTextBlock title="Условия">
          <Benefits />
        </JobTextBlock>
      </JobPage>
    </Layout>
  );
}
