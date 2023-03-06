import React from 'react';
import { SITE } from '../common/constants';

import css from './Info.module.scss';

const Info = ({ image }) => {
  return (
    <aside className={css.Info}>
      <h1 className={css.Info__Heading}>
        {image.title}
        <span className={css.Info__SubHeading}>
          {image.date} {image.year}
        </span>
      </h1>
      <p>{image.description}</p>
      <p>Download: <a
        href={`${SITE}images/${image.image}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Large
      </a> — <a
        href={`${SITE}images-social/${image.image}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        Small
      </a> — <a
        href={image.info}
        target="_blank"
        rel="noopener noreferrer"
      >
        More details and higher quality
      </a>.</p>
    </aside>
  );
};

export default Info;
