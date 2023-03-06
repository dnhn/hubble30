import React from 'react';

import css from './Image.module.scss';

const Image = ({
  image,
  hideUI,
  setBackground,
  setLoading,
  setHideUI,
}) => {
  return (
    <img
      className={css.Image}
      src={setBackground(image.image)}
      style={{ objectFit: hideUI ? 'cover' : 'contain' }}
      alt={image.title}
      onLoad={() => setLoading(false)}
      onClick={_ => setHideUI(!hideUI)}
    />
  );
};

export default Image;
