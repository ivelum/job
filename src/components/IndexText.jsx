import React from 'react';

import ExternalLinks from '../ExternalLinks';
import * as styles from '@components/IndexText.module.scss';

import hiIco from '@images/hi-ico.png';

export default function IndexText() {
  return (
    <p>
      Привет!
      <img className={styles.hiIco} src={hiIco} alt="Привет" />
      <br />
      Ниже перечислены все актуальные вакансии,которые сейчас
      {/* eslint-disable-next-line max-len */}
      открыты в&nbsp;<a href={ExternalLinks.home} target="_blank" rel="noreferrer" className="underLined">Ivelum</a>. Все вакансии
      {/* eslint-disable-next-line max-len */}
      подразумевают полную занятость, <a href={ExternalLinks.wiki.remoteWork} target="_blank" rel="noreferrer" className="underLined">удаленную работу</a> и&nbsp;<a href={ExternalLinks.wiki.remoteWork} target="_blank" rel="noreferrer" className="underLined">свободный</a> график.
      Подробную информацию о&nbsp;нас и&nbsp;о&nbsp;том как
      мы&nbsp;работаем вы&nbsp;можете
      {/* eslint-disable-next-line max-len */}
      найти в&nbsp;нашей <a href="https://github.com/ivelum/job/wiki/Home-RU" target="_blank" rel="noreferrer" className="underLined">Wiki</a>.
    </p>
  );
}
