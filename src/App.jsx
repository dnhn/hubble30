import React, { useCallback, useEffect, useState } from 'react';
import {
  ENDPOINTS,
  DAYS,
  MONTHS,
  MONTH_NAMES,
  SITE,
} from './common/constants';
import { randomRange } from './common/util';

import css from './App.module.scss';

const App = () => {
  const [month, setMonth] = useState(randomRange(1, 12));
  const [day, setDay] = useState(randomRange(1, 31));
  const [image, setImage] = useState({});
  const [error, setError] = useState(null);
  const [backgroundFit, setBackgroundFit] = useState('cover');
  const [hideUI, setHideUI] = useState(false);

  const getImage = useCallback(() => {
    const id = `${month}-${day}`;
    const newId = id !== image.id;

    if (!isNaN(month) && !isNaN(day) && newId) {
      setError(null);

      fetch(ENDPOINTS.GET_IMAGE(id))
        .then(response => response.json())
        .then(data => {
          if (data.errorMessage) {
            setError(data.errorMessage);
          } else {
            setImage(data);
          }
        });
    }
  }, [month, day, image]);

  useEffect(() => getImage(), [getImage]);

  const randomise = _ => {
    setMonth(randomRange(1, 12));
    setDay(randomRange(1, 31));
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
      <aside className={`${css.Controls} ${hideUI && css['Controls_Hidden']}`}>
        {!hideUI && (
          <select
            value={month}
            className={css.Controls__Select}
            tabIndex={1}
            onChange={e => setMonth(e.target.value)}
          >
            <option>Month</option>
            {MONTHS.map(m =>
              <option key={m} value={m}>{MONTH_NAMES[m - 1]}</option>
            )}
          </select>
        )}
        <button
          type="button"
          className={
            `${css.Controls__ReOrder} ${hideUI && css.Controls_Toggle}`
          }
          tabIndex={4}
          onClick={_ => setHideUI(!hideUI)}
        >
          Toggle UI
        </button>
        {!hideUI && (
          <select
            value={day}
            className={css.Controls__Select}
            tabIndex={2}
            onChange={e => setDay(e.target.value)}
          >
            <option>Day</option>
            {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        )}
        <button
          type="button"
          className={
            `${css.Controls__ReOrder} ${backgroundFit === 'contain' && css.Controls_Toggle}`
          }
          tabIndex={5}
          onClick={toggleBackgroundFit}
        >
          Toggle full size
        </button>
        {!hideUI &&
          <button
            type="button"
            tabIndex={3}
            onClick={getImage}
          >
            See your image
          </button>}
        <button
          type="button"
          className={css.Controls__ReOrder}
          tabIndex={6}
          onClick={randomise}
        >
          Randomise
        </button>
        {error && !hideUI ?
          <p
            className={css.Controls__Error}
            onClick={_ => setError(null)}
          >
            {error} Please select a valid date. Tap to hide this message.
          </p> :
          ''}
      </aside>
      {hasImage(image) && !hideUI ? (
        <aside className={css.Info}>
          <h1 className={css.Info__Heading}>
            {image.title}
            <span className={css.Info__SubHeading}>
              {image.date} {image.year}
            </span>
          </h1>
          <p>{image.description}</p>
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
          </a> — More details and higher quality <a
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

export default App;
