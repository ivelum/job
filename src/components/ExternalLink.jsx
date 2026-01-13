import PropTypes from 'prop-types';
import React from 'react';

export const ExternalLinks = {
  company: {
    home: 'https://ivelum.com',
    jobRepo: 'https://github.com/ivelum/job',
    bookInterview: 'https://calendly.com/olga_lebedeva_/job_interview',
    blog: 'https://ivelum.com/blog/',
  },
  contacts: {
    email: 'mailto:job@ivelum.com',
    telegram: 'tg://resolve?domain=IvelumBot',
  },
  teamplify: {
    home: 'https://teamplify.com',
  },
  youtube: {
    techTalkVideos: 'https://www.youtube.com/@ivelum',
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
  href, children, className, ...props
}) {
  const blankProps = href.startsWith('http') ? {
    target: '_blank',
    rel: 'noreferrer',
  } : {};
  return (
    <a
      href={href}
      className={className}
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
};

ExternalLink.defaultProps = {
  className: null,
};
