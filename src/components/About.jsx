import { Link } from 'gatsby';
import React from 'react';

import ExternalLink, { ExternalLinks } from './ExternalLink';

export default function About() {
  return (
    <p>
      Привет! Мы &mdash;{' '}
      <ExternalLink href={ExternalLinks.company.home}>Ivelum</ExternalLink>,
      занимаемся продуктовой разработкой с 2003 года и работаем
      над крупными софтверными проектами. У нас свободный график
      для всех сотрудников и отлично поставленные
      процессы с Минимумом Бюрократии (тм). Подробнее о том как мы работаем
      можно почитать в нашей{' '}
      <ExternalLink href={ExternalLinks.wiki.home}>Wiki</ExternalLink>,
      а также рекомендуем заглянуть в
      раздел <Link to="/faq/">Вопросы и ответы</Link>.
    </p>
  );
}
