import cn from 'classnames';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';

import * as styles from './Button.module.scss';

export default function Button({
  className,
  confettiAnimation,
  children,
  href,
  type,
  disabled,
  ...otherProps
}) {
  const content = (
    <>
      {
        (confettiAnimation) ? (
          <span className={styles.confettiAnimation} />
        ) : null
      }
      {children}
    </>
  );
  const props = {
    className: cn(
      styles.button,
      className,
      disabled && styles.disabled,
    ),
    children: content,
    ...otherProps,
  };
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  if (href) return <Link to={href} {...props} />;
  props.type = type;
  // eslint-disable-next-line react/button-has-type
  return <button {...props} />;
}

Button.propTypes = {
  className: PropTypes.string,
  confettiAnimation: PropTypes.bool,
  children: PropTypes.node.isRequired,
  href: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  className: '',
  confettiAnimation: false,
  href: '',
  type: '',
  disabled: false,
};
