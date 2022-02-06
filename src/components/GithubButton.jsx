import * as React from 'react';

import ExternalLink, { ExternalLinks } from './ExternalLink';

import * as styles from './GithubButton.module.scss';
import githubLogo from '@/images/github-button.svg';

export default function GithubButton() {
  return (
    <ExternalLink
      href={ExternalLinks.company.jobRepo}
      className={styles.github}
      noUnderline
    >
      <img
        src={githubLogo}
        className={styles.image}
        alt="Fork me on GitHub"
      />
    </ExternalLink>
  );
}
