import cn from 'classnames';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import React from 'react';

import * as styles from './ExternalLink.module.scss';

const links = {
  company: {
    home: 'https://ivelum.com',
    bookInterview: 'https://calendly.com/olga-lebedeva/developer-job-interview',
  },
  teamplify: {
    home: 'https://templify.com',
  },
  webinar: {
    continuousDeployment: 'https://youtu.be/pt_MkFT51aA',
  },
  wiki: {
    home: 'https://github.com/ivelum/job/wiki/Home-RU',
    compensationPackage: 'https://github.com/ivelum/job/wiki/Пакет-компенсаций',
    englishLessons: 'https://github.com/ivelum/job/wiki/Обучение-английскому',
    remoteWork: 'https://github.com/ivelum/job/wiki/График-и-удаленная-работа',
    technology: 'https://github.com/ivelum/job/wiki/Технологии',
  },
};

export default function ExternalLink({
  link, href, children, className, noUnderline, ...props
}) {
  const hrefProp = href || get(links, link);
  const blankProps = hrefProp.startsWith('http') ? {
    target: '_blank',
    rel: 'noreferrer',
  } : {};
  return (
    <a
      href={hrefProp}
      className={cn(!noUnderline && styles.underlined, className)}
      {...blankProps}
      {...props}
    >
      {children}
    </a>
  );
}

ExternalLink.propTypes = {
  link: PropTypes.string,
  href: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  noUnderline: PropTypes.bool,
};

ExternalLink.defaultProps = {
  link: null,
  href: null,
  className: null,
  noUnderline: false,
};
