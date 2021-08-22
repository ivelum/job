import React from 'react';

import ExternalLinks from '../ExternalLinks';

export default function About() {
  return (
    <p>
      Привет! Мы - <a href={ExternalLinks.home}>ivelum</a>, занимаемся
      продуктовой разработкой с 2003 года и работаем над крупными софтверными
      проектами. У нас свободный график для всех сотрудников и отлично
      поставленные процессы с Минимумом Бюрократии (тм). Подробнее о нас и о
      том, как мы работаем можно почитать
      в <a href={ExternalLinks.wiki.home}>нашей вики</a>.
    </p>
  );
}
