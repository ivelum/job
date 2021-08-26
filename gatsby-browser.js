import React from 'react';

import Crisp from './src/components/Crisp';

// eslint-disable-next-line import/prefer-default-export
export const wrapPageElement = ({ element }) => (
  // eslint-disable-next-line react/jsx-filename-extension
  <Crisp>
    {element}
  </Crisp>
);
