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
            направлениям &mdash; как привлекая новых клиентов
            для{' '}
            <ExternalLink href={ExternalLinks.company.home}>
              заказной разработки
            </ExternalLink>, так и увеличивая продажи{' '}
            <ExternalLink href={ExternalLinks.teamplify.home}>
              нашего продукта
            </ExternalLink>. Мы ожидаем, что у вас есть опыт в маркетинге
            (от 5 лет) и вам близка сфера IT. Мы уже сами пробуем что-то
            делать с контент-маркетингом, рекламой, SEO и другими
            инициативами, но у нас пока нет специально выделенного
            человека для этого, поэтому надеемся, что вы придете и
            поднимите эту деятельность на новый уровень&nbsp;🙂
          </p>
        </JobTextBlock>
        <JobTextBlock title="Условия">
          <Benefits />
        </JobTextBlock>
      </JobPage>
    </Layout>
  );
}
