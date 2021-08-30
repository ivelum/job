import React from 'react';

import ExternalLink, { ExternalLinks } from '@/components/ExternalLink';

export default function Benefits() {
  return (
    <div className="mt-50">
      <h2>Условия</h2>
      <ul className="mt-30">
        <li>
          <ExternalLink href={ExternalLinks.wiki.remoteWork}>
            Удалёнка
          </ExternalLink>,{' '}
          <ExternalLink href={ExternalLinks.wiki.remoteWork}>
            свободный график
          </ExternalLink>, полная занятость. Работа с&nbsp;частичной занятостью
          не&nbsp;рассматривается;
        </li>
        <li>
          Корпоративный Macbook или денежная компенсация на&nbsp;покупку
          собственного оборудования. Подробнее&nbsp;&mdash;
          в&nbsp;разделе{' '}
          <ExternalLink href={ExternalLinks.wiki.compensationPackage}>
            пакет компенсаций
          </ExternalLink> в&nbsp;нашей вики;
        </li>
        <li>
          <ExternalLink href={ExternalLinks.wiki.englishLessons}>
            Курсы английского
          </ExternalLink> с&nbsp;профессиональным преподавателем из&nbsp;США.
        </li>
      </ul>
    </div>
  );
}
