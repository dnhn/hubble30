import React from 'react';

import css from './Controls.module.scss';

const Controls = ({
  hideUI,
  setHideUI,
  month,
  setMonth,
  day,
  setDay,
  randomDate,
  error,
}) => {
  return (
    <aside className={`${css.Controls} ${hideUI && css['Controls_Hidden']}`}>
      <button
        className={css.Hamburger}
        type='button'
        onClick={_ => setHideUI(!hideUI)}
      >
        <span></span><span></span><span></span>
      </button>
      {!hideUI &&
        <div className={css.Controls__Toggle}>
          <select
            value={month}
            className={css.Controls__Select}
            onChange={e => setMonth(e.target.value)}
          >
            {[...Array(12)].map((m, i) =>
              <option key={i} value={i + 1}>
                {new Intl.DateTimeFormat('en', { month: 'short' }).format(new Date(`'${i + 1}'`))}
              </option>
            )}
          </select>
          <select
            value={day}
            className={css.Controls__Select}
            onChange={e => setDay(e.target.value)}
          >
            {[...Array(31)].map((d, i) =>
              <option key={i} value={i + 1}>{i + 1}</option>
            )}
          </select>
          <button
            type="button"
            className={css.Controls__Random}
            onClick={randomDate}
            title="Get a random image"
          >
            🔀
          </button>
        </div>
      }
      {error && !hideUI && <p className={css.Controls__Error}>{error}</p>}
    </aside>
  );
};

export default Controls;
