import cn from 'classnames';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import * as styles from './CalloutLink.module.css';

export default function CalloutLink({
  children,
  className,
  to,
  ...props
}) {
  return (
    <Link className={cn(styles.calloutLink, className)} to={to} {...props}>
      {children}
    </Link>
  );
}

CalloutLink.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  to: PropTypes.string.isRequired,
};

CalloutLink.defaultProps = {
  children: null,
  className: null,
};
