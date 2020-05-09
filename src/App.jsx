import React, { useState } from 'react';
import {
  ENDPOINTS,
  DAYS,
  MONTHS,
  MONTH_NAMES,
  SITE,
} from './common/constants';

import css from './App.module.scss';

export default () => {
  const [month, setMonth] = useState();
  const [day, setDay] = useState();
  const [image, setImage] = useState({});
  const [error, setError] = useState(null);
  const [backgroundFit, setBackgroundFit] = useState('cover');

  const getImage = () => {
    if (month && day) {
      setError(null);
      setImage({});

      fetch(ENDPOINTS.GET_IMAGE(`${month}-${day}`))
        .then(response => response.json())
        .then(data => {
          if (data.errorMessage) {
            setError(data.errorMessage);
          } else {
            setImage(data);
          }
        });
    }
  };

  const toggleBackgroundFit = _ => {
    const CONTAIN = 'contain';
    const COVER = 'cover';

    setBackgroundFit(backgroundFit === COVER ? CONTAIN : COVER);
  };

  const hasImage = image => Object.keys(image).length;

  const setBackground = (bg = '') => bg ? `${SITE}images/${bg}` : '';

  return (
    <main className={css.App}>
      {hasImage(image) ? (
        <img
          className={css.Background}
          src={setBackground(image.image)}
          style={{ objectFit: backgroundFit }}
          alt={image.title}
        />
      ) : ''}
      <aside className={css.Controls}>
        <select
          className={css.Controls__Select}
          onChange={e => setMonth(e.target.value)}
        >
          <option>Month</option>
          {MONTHS.map(m =>
            <option key={m} value={m}>{MONTH_NAMES[m - 1]}</option>
          )}
        </select>
        <select
          className={css.Controls__Select}
          onChange={e => setDay(e.target.value)}
        >
          <option>Day</option>
          {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        <button type="button" onClick={getImage}>See your image</button>
        <button type="button" onClick={toggleBackgroundFit}>
          Toggle full size
        </button>
        {error ?
          <p className={css.Controls__Error}>
            {JSON.stringify(error)} Please select a valid date.
          </p> :
          ''}
      </aside>
      {hasImage(image) ? (
        <aside className={css.Info}>
          <h1 className={css.Info__Heading}>{image.title}</h1>
          <p>
            Taken on <strong>
              {image.date} {image.year}
            </strong>. {image.description}
          </p>
          <p><a
            href={`${SITE}images/${image.image}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Full image
          </a> — <a
            href={`${SITE}images-social/${image.image}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Smaller for sharing
          </a></p>
          <p>Read more about this image and download even larger size <a
            href={image.info}
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>.</p>
        </aside>
      ) : ''}
    </main>
  );
};
