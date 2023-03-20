import React, { Fragment } from 'react';

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
      <div className={css.Controls__Controls}>
        <button
          className={css.Hamburger}
          type='button'
          onClick={_ => setHideUI(!hideUI)}
          aria-label="Toggle user interface"
        >
          <span></span><span></span><span></span>
        </button>
        {!hideUI &&
          <Fragment>
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
          </Fragment>
        }
        {error && !hideUI && <p className={css.Controls__Error}>{error}</p>}
      </div>
      {!hideUI &&
        <div className={css.Controls__Info}>
          <strong>U</strong>: toggle UI<br />
          <strong>I</strong>: random image<br />
          <strong>T</strong>: today’s image<br />
        </div>
      }
    </aside>
  );
};

export default Controls;
