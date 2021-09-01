import cn from 'classnames';
import PropTypes from 'prop-types';
import * as React from 'react';

import * as styles from '@/components/Row.module.scss';

export default function Row({ children, gutterY }) {
  return (
    <div className={cn(gutterY && styles.gutterY, styles.row)}>
      {children}
    </div>
  );
}

Row.propTypes = {
  children: PropTypes.node.isRequired,
  gutterY: PropTypes.bool,
};

Row.defaultProps = {
  gutterY: false,
};
