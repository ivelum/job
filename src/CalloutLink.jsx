import cn from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import * as styles from './CalloutLink.module.css';

export default function CalloutLink({
  children,
  className,
  href,
  ...props
}) {
  return (
    <a className={cn(styles.calloutLink, className)} href={href} {...props}>
      {children}
    </a>
  );
}

CalloutLink.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  href: PropTypes.string,
};

CalloutLink.defaultProps = {
  children: null,
  className: null,
  href: null,
};
