import PropTypes from 'prop-types';
import React from 'react';

export default function GenericPage({ children }) {
  return (
    <>
      {children}
    </>
  );
}

GenericPage.propTypes = {
  children: PropTypes.node,
};

GenericPage.defaultProps = {
  children: null,
};
