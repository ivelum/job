import React from 'react';

import ExternalLinks from '../ExternalLinks';

export default function Benefits() {
  return (
    <div className="mt-50">
      <h2>Условия</h2>
      <ul className="mt-30">
        <li>
          {/* eslint-disable-next-line max-len */}
          <a href={ExternalLinks.wiki.remoteWork} target="_blank" rel="noreferrer" className="underLined">Удаленка</a>, <a href={ExternalLinks.wiki.remoteWork} target="_blank" rel="noreferrer" className="underLined">свободный график</a>,
          полная занятость. Работа с&nbsp;частичной занятостью
          не&nbsp;рассматривается;
        </li>
        <li>
          Корпоративный Macbook, или денежная компенсация на&nbsp;покупку
          собственного оборудования. Подробнее&nbsp;&mdash;
          {/* eslint-disable-next-line max-len */}
          в&nbsp;разделе <a href={ExternalLinks.wiki.compensationPackage} target="_blank" rel="noreferrer" className="underLined">пакет компенсаций</a> в&nbsp;нашей вики;
        </li>
        <li>
          {/* eslint-disable-next-line max-len */}
          <a href={ExternalLinks.wiki.englishLessons} target="_blank" rel="noreferrer" className="underLined">Курсы английского</a> с&nbsp;профессиональным преподавателем из&nbsp;США;
        </li>
      </ul>
    </div>
  );
}
