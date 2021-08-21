import React from 'react';

import ExternalLinks from './ExternalLinks';

export default function Benefits() {
  return (
    <>
      <h2>Условия</h2>
      <ul>
        <li>
          <a href={ExternalLinks.wiki.remoteWork}>
            удаленка, свободный график
          </a>, полная занятость. Работа с частичной занятостью не
          рассматривается;
        </li>
        <li>
          корпоративный Macbook, или денежная компенсация на покупку
          собственного оборудования. Подробнее - в разделе{' '}
          <a href={ExternalLinks.wiki.compensationPackage}>
            Пакет компенсаций
          </a> в нашей вики;
        </li>
        <li>
          <a href={ExternalLinks.wiki.englishLessons}>курсы английского</a> с
          профессиональным преподавателем из США.
        </li>
      </ul>
    </>
  );
}
