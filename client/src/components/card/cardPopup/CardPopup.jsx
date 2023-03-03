import React from 'react';
import style from './style.module.scss';
import { IconX } from '@tabler/icons-react';

export default function CardPopup({ title, text, children }) {
  return (
    <div className={style.card}>
      <div className={style.header}>
        <h1>{title}</h1>
        <IconX />
      </div>
      <div className={style.body}>
        {text && <h1 className={style.text}>{text}</h1>}
        {children}
      </div>
    </div>
  );
}
