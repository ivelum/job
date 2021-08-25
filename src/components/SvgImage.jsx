import PropTypes from 'prop-types';
import React from 'react';

// Require the .svg files and save them in the object, so that we can
// dynamically access them by name.
//
// https://webpack.js.org/guides/dependency-management/
// https://stackoverflow.com/a/46210355
export const svgByName = {};
const imagesCtx = require.context('../images', false, /\.svg$/);
imagesCtx.keys().forEach((path) => {
  const name = path.slice(2).slice(0, -4); // "./icon.svg" -> "icon"
  if (svgByName[name]) {
    throw new Error(`Duplicate icon name: ${name}`);
  }
  const { ReactComponent } = imagesCtx(path);
  svgByName[name] = ReactComponent;
});

export default function SvgImage({ name }) {
  const Icon = svgByName[name];
  return <Icon />;
}

SvgImage.propTypes = {
  name: PropTypes.oneOf(Object.keys(svgByName)).isRequired,
};
