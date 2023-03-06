import React, { useCallback, useEffect, useState } from 'react';
import {
  ENDPOINTS,
  DAYS,
  MONTHS,
  MONTH_NAMES,
  INVALID_DATES,
  SITE,
} from './common/constants';
import { randomRange } from './common/util';

import css from './App.module.scss';

const App = () => {
  const [month, setMonth] = useState(randomRange(1, 12));
  const [day, setDay] = useState(randomRange(1, 31));
  const [image, setImage] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hideUI, setHideUI] = useState(false);

  const getImage = useCallback(() => {
    const id = `${month}-${day}`;
    const newId = id !== image.id;

    if (INVALID_DATES.includes(id)) {
      setError('Invalid input.');
      return;
    }

    if (!isNaN(month) && !isNaN(day) && newId) {
      setError(null);

      fetch(ENDPOINTS.GET_IMAGE(id))
        .then(response => response.json())
        .then(data => {
          if (data.errorMessage) {
            setError(data.errorMessage);
          } else {
            setImage(data);
            setLoading(true);
          }
        });
    }
  }, [month, day, image]);

  useEffect(() => getImage(), [getImage]);

  const randomDate = _ => {
    let month = randomRange(1, 12);
    let day = randomRange(1, 31);

    while (INVALID_DATES.includes(`${month}-${day}`)) {
      month = randomRange(1, 12);
      day = randomRange(1, 31);
    }

    setMonth(month);
    setDay(day);
  };

  const hasImage = image => Object.keys(image).length;

  const setBackground = (bg = '') => bg ? `${SITE}images/${bg}` : '';

  return (
    <main className={css.App}>
      {hasImage(image) &&
        <img
          className={css.Background}
          src={setBackground(image.image)}
          style={{ objectFit: hideUI ? 'cover' : 'contain' }}
          alt={image.title}
          onLoad={() => setLoading(false)}
          onClick={_ => setHideUI(!hideUI)}
        />
      }
      <div className={`${css.Loading} ${loading && css['Loading_Show']}`} />
      <aside className={`${css.Controls} ${hideUI && css['Controls_Hidden']}`}>
        {!hideUI &&
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
        }
        <button
          type="button"
          className={
            `${css.Controls__ReOrder} ${hideUI && css.Controls_Toggle}`
          }
          tabIndex={4}
          onClick={_ => setHideUI(!hideUI)}
        >
          {hideUI ? 'Show' : 'Hide'} UI
        </button>
        {!hideUI &&
          <select
            value={day}
            className={css.Controls__Select}
            tabIndex={2}
            onChange={e => setDay(e.target.value)}
          >
            <option>Day</option>
            {DAYS.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        }
        {!hideUI &&
          <button
            type="button"
            tabIndex={3}
            onClick={getImage}
            disabled={INVALID_DATES.includes(`${month}-${day}`)}
          >
            Get image
          </button>
        }
        <button
          type="button"
          className={css.Controls__ReOrder}
          tabIndex={6}
          onClick={randomDate}
          title="Get a random image"
        >
          Random
        </button>
        {error && !hideUI &&
          <p
            className={css.Controls__Error}
            onClick={_ => setError(null)}
          >
            {error} Please select a valid date.
          </p>
        }
      </aside>
      {hasImage(image) && !hideUI &&
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
      }
    </main>
  );
};

export default App;
