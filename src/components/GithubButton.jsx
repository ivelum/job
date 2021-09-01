import * as React from 'react';

import githubLogo from '@/images/github-button.svg';

import ExternalLink, { ExternalLinks } from '@/components/ExternalLink';
import * as styles from '@/components/GithubButton.module.scss';

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
