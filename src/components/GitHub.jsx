import React from 'react';

import css from './GitHub.module.scss';

const GitHub = () => {
  return (
    <a
      href="https://github.com/dnhn/hubble30"
      className={css.GitHub}
      target="_blank"
    >
      <img src="./github-mark-white.svg" alt="GitHub" />
    </a>
  );
};

export default GitHub;
