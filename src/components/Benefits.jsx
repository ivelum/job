import React from 'react';

import ExternalLink from '@/components/ExternalLink';

export default function Benefits() {
  return (
    <div className="mt-50">
      <h2>Условия</h2>
      <ul className="mt-30">
        <li>
          <ExternalLink link="wiki.remoteWork">Удаленка</ExternalLink>,{' '}
          <ExternalLink link="wiki.remoteWork">свободный график</ExternalLink>,
          полная занятость. Работа с&nbsp;частичной занятостью
          не&nbsp;рассматривается;
        </li>
        <li>
          Корпоративный Macbook, или денежная компенсация на&nbsp;покупку
          собственного оборудования. Подробнее&nbsp;&mdash;
          в&nbsp;разделе{' '}
          <ExternalLink link="wiki.compensationPackage">
            пакет компенсаций
          </ExternalLink> в&nbsp;нашей вики;
        </li>
        <li>
          <ExternalLink link="wiki.englishLessons">
            Курсы английского
          </ExternalLink> с&nbsp;профессиональным преподавателем из&nbsp;США;
        </li>
      </ul>
    </div>
  );
}
