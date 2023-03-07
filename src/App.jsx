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
import Controls from './components/Controls';
import Info from './components/Info';

const App = () => {
  const dateParams = new URLSearchParams(window.location.search).get('date');

  const [month, setMonth] = useState(dateParams ? dateParams.split('-')[0] : randomRange(1, 12));
  const [day, setDay] = useState(dateParams ? dateParams.split('-')[1] : randomRange(1, 31));
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
      <Controls
        hideUI={hideUI}
        setHideUI={setHideUI}
        month={month}
        setMonth={setMonth}
        day={day}
        setDay={setDay}
        randomDate={randomDate}
        error={error}
      />
      {hasImage(image) && !hideUI && <Info image={image} /> }
    </main>
  );
};

export default App;
