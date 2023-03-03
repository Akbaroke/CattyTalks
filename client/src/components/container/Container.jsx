import React from 'react';
import style from './style.module.scss';

export default function Container({ children, disable = false }) {
  return (
    <div className={style.container}>
      {!disable && (
        <div className={style.accessories}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      )}
      <div>{children}</div>
    </div>
  );
}
