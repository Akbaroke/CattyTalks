import {
  IconDotsVertical,
  IconMessageDots,
} from '@tabler/icons-react'
import React, { useEffect, useRef, useState } from 'react'
import style from './stye.module.scss'
import { countdownTime } from '../../utils/countdownTimestamp.js'
import useCurrentDate from '../../hooks/useCurrentDate.js'
import useDetectOutsideClick from '../../hooks/useDetectOutsideClick.js'
import axios from '../../api'
import { useSWRConfig } from 'swr'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setRoom } from '../../redux/actions/room'
import globalType from '../../globalType'
import { useLoadingState } from '../../zustand/loading-state'
import { useAlertState } from '../../zustand/alert-state'

const CardListRoom = ({ data, from }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useSelector(state => state.user)
  const { mutate } = useSWRConfig()
  const dropdownRef = useRef(null)
  const [isOpen, setIsOpen] = useDetectOutsideClick(
    dropdownRef,
    false
  )
  const [role, setRole] = useState('')
  const { loadingSet, loadingUnset } = useLoadingState(
    state => state
  )
  const { alertOpenSuccess, alertOpenError } =
    useAlertState(state => state)

  useEffect(() => {
    if (from === globalType.MYROOM) {
      setRole('host')
    } else if (from === globalType.MYJOIN) {
      setRole('visitor')
    }
  }, [from])

  const handleDelete = async (roomId, userId) => {
    loadingSet()
    try {
      const { data } = await axios.delete(
        `/room?ui=${userId}&ri=${roomId}`
      )
      mutate(`/room/${id}`)
      mutate('/room/join')
      mutate(`/room/status/${data.code}`)
      alertOpenSuccess(data.msg)
    } catch (error) {
      alertOpenError(error.response.data.msg)
    }
    loadingUnset()
  }

  const handleDeleteJoin = async code => {
    loadingSet()
    try {
      const { data } = await axios.delete(
        `/room/join/${id}/${code}`
      )
      mutate('/room/join')
      alertOpenSuccess(data.msg)
    } catch (error) {
      alertOpenError(error.response.data.msg)
    }
    loadingUnset()
  }

  const goToChatRoom = () => {
    dispatch(setRoom(data.code, data.name, role))
    navigate(`/chat`)
  }

  return (
    <div className={style.layerContainer}>
      <div className={style.dobleLayer}></div>
      <div
        className={style.cardListRoom}
        onClick={goToChatRoom}>
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
          onClick={e => {
            e.stopPropagation()
            setIsOpen(!isOpen)
          }}
        />
        <div className={style.option}>
          <div
            className={
              isOpen ? style.dropdown : style.dropdownHide
            }>
            {role === 'host' && (
              <span
                onClick={e => {
                  e.stopPropagation()
                  alertOpenError(
                    'Sorry, this feature is still under development.'
                  )
                }}>
                setting
              </span>
            )}
            <span
              className={style.delete}
              onClick={e => {
                e.stopPropagation()
                role === 'host'
                  ? handleDelete(data.id, data.id_user)
                  : handleDeleteJoin(data.code)
              }}>
              delete
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardListRoom
