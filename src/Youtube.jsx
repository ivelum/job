import PropTypes from 'prop-types';
import React from 'react';

import * as styles from './Youtube.module.scss';

export default function Youtube({ videoId }) {
  const allow = [
    'accelerometer',
    'autoplay',
    'clipboard-write',
    'encrypted-media',
    'gyroscope',
    'picture-in-picture',
  ];
  return (
    <div className={styles.videoWrapper}>
      <iframe
        allow={allow.join('; ')}
        allowFullScreen
        frameBorder="0"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        width="560"
      />
    </div>
  );
}

Youtube.propTypes = {
  videoId: PropTypes.string.isRequired,
};
