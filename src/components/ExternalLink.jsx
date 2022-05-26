import cn from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import * as styles from './ExternalLink.module.scss';

export const ExternalLinks = {
  company: {
    home: 'https://ivelum.com',
    jobRepo: 'https://github.com/ivelum/job',
    bookInterview: (
      'https://calendly.com/oleg-malkov/hiring-interview'
    ),
  },
  contacts: {
    email: 'mailto:job@ivelum.com',
    telegram: 'tg://resolve?domain=IvelumBot',
  },
  teamplify: {
    home: 'https://teamplify.com',
  },
  webinar: {
    continuousDeployment: 'https://youtu.be/pt_MkFT51aA',
  },
  wiki: {
    home: 'https://github.com/ivelum/job/wiki/Home-RU',
    compensationPackage: 'https://github.com/ivelum/job/wiki/Пакет-компенсаций',
    developmentFlow: 'https://github.com/ivelum/job/wiki/Процесс-разработки',
    englishLessons: 'https://github.com/ivelum/job/wiki/Обучение-английскому',
    feedback: 'https://github.com/ivelum/job/wiki/Обратная-связь-для-коллег',
    learning: 'https://github.com/ivelum/job/wiki/Постоянное-обучение',
    remoteWork: 'https://github.com/ivelum/job/wiki/График-и-удаленная-работа',
    teamsStructure: 'https://github.com/ivelum/job/wiki/Структура-команд',
    technology: 'https://github.com/ivelum/job/wiki/Технологии',
  },
};

export default function ExternalLink({
  href, children, className, noUnderline, ...props
}) {
  const blankProps = href.startsWith('http') ? {
    target: '_blank',
    rel: 'noreferrer',
  } : {};
  return (
    <a
      href={href}
      className={cn(!noUnderline && styles.underlined, className)}
      {...blankProps}
      {...props}
    >
      {children}
    </a>
  );
}

ExternalLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  noUnderline: PropTypes.bool,
};

ExternalLink.defaultProps = {
  className: null,
  noUnderline: false,
};
