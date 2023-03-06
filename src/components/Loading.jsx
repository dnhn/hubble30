import React from 'react';

import css from './Loading.module.scss';

const Loading = ({ loading }) => {
  return <div className={`${css.Loading} ${loading && css['Loading_Show']}`} />;
};

export default Loading;
