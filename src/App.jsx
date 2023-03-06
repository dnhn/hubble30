import React, { useCallback, useEffect, useState } from 'react';
import {
  ENDPOINTS,
  INVALID_DATES,
  ERROR_MESSAGES,
  SITE,
} from './common/constants';
import { randomRange } from './common/util';

import css from './App.module.scss';

import Image from './components/Image';
import Loading from './components/Loading';
import Info from './components/Info';

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

    if (isNaN(month) || isNaN(day)) {
      setError(ERROR_MESSAGES.EMPTY_DATE);
      return;
    }

    if (INVALID_DATES.includes(id)) {
      setError(ERROR_MESSAGES.INVALID_DATE);
      return;
    }

    if (!isNaN(month) && !isNaN(day) && newId) {
      setError(null);

      fetch(ENDPOINTS.GET_IMAGE(id))
        .then(response => response.json())
        .then(data => {
          if (data.errorMessage) {
            setError(ERROR_MESSAGES[data.errorMessage]);
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
        <Image
          image={image}
          hideUI={hideUI}
          setBackground={setBackground}
          setLoading={setLoading}
          setHideUI={setHideUI}
        />
      }
      <Loading loading={loading} />
      <aside className={`${css.Controls} ${hideUI && css['Controls_Hidden']}`}>
        {!hideUI &&
          <select
            value={month}
            className={css.Controls__Select}
            tabIndex={1}
            onChange={e => setMonth(e.target.value)}
          >
            <option>Month</option>
            {[...Array(12)].map((m, i) =>
              <option key={i} value={i + 1}>
                {new Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(`'${i + 1}'`))}
              </option>
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
            {[...Array(31)].map((d, i) =>
              <option key={i} value={i + 1}>{i + 1}</option>
            )}
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
            {error}
          </p>
        }
      </aside>
      {hasImage(image) && !hideUI && <Info image={image} /> }
    </main>
  );
};

export default App;
