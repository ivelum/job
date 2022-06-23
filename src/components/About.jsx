import { Link } from 'gatsby';
import React from 'react';

import ExternalLink, { ExternalLinks } from './ExternalLink';

export default function About() {
  return (
    <p>
      Привет! Мы&nbsp;&mdash;{' '}
      <ExternalLink href={ExternalLinks.company.home}>ivelum</ExternalLink>,
      занимаемся продуктовой разработкой с&nbsp;2003 года и&nbsp;работаем
      над крупными софтверными проектами. У&nbsp;нас свободный график
      для всех сотрудников и&nbsp;отлично поставленные
      процессы с&nbsp;Минимумом Бюрократии (тм). Подробнее о&nbsp;нас
      и&nbsp;о&nbsp;том, как мы&nbsp;работаем можно
      почитать в&nbsp;нашей{' '}
      <ExternalLink href={ExternalLinks.wiki.home}>Wiki</ExternalLink>,{' '}
      а&nbsp;также рекомендуем заглянуть
      в раздел <Link to="/faq/">вопросы и ответы</Link>.
    </p>
  );
}
