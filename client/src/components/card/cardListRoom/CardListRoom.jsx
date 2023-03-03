import { IconDotsVertical, IconMessageDots } from '@tabler/icons-react';
import React from 'react';
import style from './stye.module.scss';

const CardListRoom = ({ data }) => {
  return (
    <div className={style.layerContainer}>
      <div className={style.dobleLayer}></div>
      <div className={style.cardListRoom}>
        <div>
          <IconMessageDots />
        </div>
        <div>
          <h1>{data.name}</h1>
          <h2>{data.code}</h2>
        </div>
        <span className={style.info_room}>{data.time}</span>
        <IconDotsVertical className={style.btn_sett} />
      </div>
    </div>
  );
};

export default CardListRoom;
