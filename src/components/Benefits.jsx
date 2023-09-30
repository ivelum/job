import { Link } from 'gatsby';
import React from 'react';

import ExternalLink, { ExternalLinks } from './ExternalLink';

export default function Benefits() {
  return (
    <ul>
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
        </ExternalLink> с&nbsp;профессиональным преподавателем из&nbsp;США;
      </li>
      <li>
        Обратите внимание: для этой вакансии есть ограничения
        по странам с которыми мы можем работать. В частности, мы не сможем
        заключить с вами контракт если вы находитесь в России, Беларуси,
        Туркменистане, Китае и ряде других стран. Это касается не
        гражданства, а только нахождения на территории этих стран. Во время
        заполнения <Link to="form/">анкеты</Link> выберите вашу страну из
        списка. Если для нее есть какие-то ограничения, вы сразу увидите
        сообщение об этом.
      </li>
    </ul>
  );
}
