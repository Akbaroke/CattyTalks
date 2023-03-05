import { IconDotsVertical, IconMessageDots } from '@tabler/icons-react';
import React, { useRef } from 'react';
import style from './stye.module.scss';
import { countdownTime } from '../../../utils/countdownTimestamp.js';
import useCurrentDate from '../../../hooks/useCurrentDate.js';
import useDetectOutsideClick from '../../../hooks/useDetectOutsideClick';
import axios from '../../../api';
import { useSWRConfig } from 'swr'
import { useSelector } from 'react-redux'

const CardListRoom = ({ data }) => {
  const { id } = useSelector(state => state.user)
  const { mutate } = useSWRConfig()
  const dropdownRef = useRef(null)
  const [isOpen, setIsOpen] = useDetectOutsideClick(
    dropdownRef,
    false
  )

  const handleDelete = async (roomId, userId) => {
    const { data } = await axios.delete(
      `/room?ui=${userId}&ri=${roomId}`
    )
    mutate(`/room/${id}`)
    console.log(data)
  }

  return (
    <div className={style.layerContainer}>
      <div className={style.dobleLayer}></div>
      <div className={style.cardListRoom}>
        <div className={style.icon}>
          <IconMessageDots />
        </div>
        <div className={style.label}>
          <h1>{data.name}</h1>
          <h2>{data.code}</h2>
        </div>
        <span className={style.info_room}>
          {countdownTime(
            parseInt(data.time),
            useCurrentDate()
          )}
        </span>
        <IconDotsVertical
          ref={dropdownRef}
          className={style.btn_sett}
          onClick={() => setIsOpen(!isOpen)}
        />
        <div className={style.option}>
          <div
            className={
              isOpen ? style.dropdown : style.dropdownHide
            }>
            <span>setting</span>
            <span
              className={style.delete}
              onClick={() =>
                handleDelete(data.id, data.id_user)
              }>
              delete
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardListRoom;
