import React from 'react';

import ExternalLink from '@components/ExternalLink';

export default function About() {
  return (
    <p>
      Привет! Мы&nbsp;&mdash;{' '}
      <ExternalLink link="company.home">Ivelum</ExternalLink>,
      занимаемся продуктовой разработкой с&nbsp;2003 года и&nbsp;работаем
      над крупными софтверными проектами. У&nbsp;нас свободный график
      для всех сотрудников и&nbsp;отлично поставленные
      процессы с&nbsp;Минимумом Бюрократии (тм). Подробнее о&nbsp;нас
      и&nbsp;о&nbsp;том, как мы&nbsp;работаем можно
      почитать в&nbsp;нашей <ExternalLink link="wiki.home">Wiki</ExternalLink>.
    </p>
  );
}
