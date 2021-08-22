import PropTypes from 'prop-types';
import React from 'react';

import * as styles from './TechLogos.module.scss';
import awsLogo from '@images/aws.svg';
import djangoLogo from '@images/django.svg';
import dockerLogo from '@images/docker.svg';
import graphqlLogo from '@images/graphql.svg';
import pythonLogo from '@images/python.svg';
import reactLogo from '@images/react.svg';

const logos = {
  AWS: awsLogo,
  Django: djangoLogo,
  Docker: dockerLogo,
  GraphQL: graphqlLogo,
  Python: pythonLogo,
  React: reactLogo,
};

export default function TechLogos({ brands }) {
  return (
    <p>
      {brands.map((brand) => (
        <img alt={brand} className={styles.logo} src={logos[brand]} />
      ))}
    </p>
  );
}

TechLogos.propTypes = {
  brands: PropTypes.arrayOf(PropTypes.oneOf(Object.keys(logos))).isRequired,
};
