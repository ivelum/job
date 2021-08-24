import React from 'react';

import ExternalLinks from '../ExternalLinks';

export default function About() {
  return (
    <p>
      {/* eslint-disable-next-line max-len */}
      Привет! Мы&nbsp;&mdash; <a href={ExternalLinks.home} target="_blank" rel="noreferrer" className="underLined">Ivelum</a>,
      занимаемся продуктовой разработкой с&nbsp;2003 года и&nbsp;работаем
      над крупными софтверными проектами. У&nbsp;нас свободный график
      для всех сотрудников и&nbsp;отлично поставленные
      процессы с&nbsp;Минимумом Бюрократии (тм). Подробнее о&nbsp;нас
      и&nbsp;о&nbsp;том, как мы&nbsp;работаем можно
      {/* eslint-disable-next-line max-len */}
      почитать в&nbsp;нашей <a href={ExternalLinks.wiki.home} target="_blank" rel="noreferrer" className="underLined">Wiki</a>.
    </p>
  );
}
