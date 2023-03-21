import React, { useEffect, useState } from 'react';
import {
  SITE_TITLE,
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
import GitHub from './components/GitHub';

const App = () => {
  // Get date from URL
  const dateParams = new URLSearchParams(window.location.search).get('date');

  // Unless get current date
  const [month, setMonth] = useState(dateParams ? dateParams.split('-')[0] : new Date().getMonth() + 1);
  const [day, setDay] = useState(dateParams ? dateParams.split('-')[1] : new Date().getDate());
  const [image, setImage] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hideUI, setHideUI] = useState(false);

  useEffect(() => {
    const id = `${month}-${day}`;
    const newId = id !== image.id;

    // Empty month or day
    if (isNaN(month) || isNaN(day)) {
      setError(ERROR_MESSAGES.EMPTY_DATE);
      return;
    }

    // Invalid date
    if (INVALID_DATES.includes(id)) {
      setError(ERROR_MESSAGES.INVALID_DATE);
      return;
    }

    // If valid and new date then get new image
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
            // Set page title
            document.title = `${data.title} — ${SITE_TITLE}`;

            // Update URL parameter with new date
            const url = new URL(window.location);
            url.searchParams.set('date', data.id);
            window.history.pushState({}, '', url);
          }
        });
    }
  }, [month, day, image]);

  // Keyboard shortcuts
  useEffect(() => {
    const onKeyDown = e => {
      switch (e.key) {
        case 'u': setHideUI(!hideUI); break;
        case 'i': randomDate(); break;
        case 't':
          setMonth(new Date().getMonth() + 1);
          setDay(new Date().getDate());
        default:
      }
    }

    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
  });

  const randomDate = _ => {
    let month = randomRange(1, 12);
    let day = randomRange(1, 31);

    // Random until date is valid
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
      {hasImage(image) && !hideUI && <Info image={image} />}
      {!hideUI && <GitHub />}
    </main>
  );
};

export default App;
