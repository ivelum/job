import React from 'react';

import ExternalLink, { ExternalLinks } from '@/components/ExternalLink';
import SvgImage from '@/components/SvgImage';

import * as styles from './Footer.module.scss';

export default function Footer() {
  return (
    <div className={styles.footer}>
      <ExternalLink
        href={ExternalLinks.youtube.techTalkVideos}
        className={styles.youtube}
      >
        <SvgImage name="ico-youtube" />Наш YouTube
      </ExternalLink>
      <div className={styles.copyright}>
        © ivelum 2003 – {new Date().getFullYear()}
      </div>
    </div>
  );
}
