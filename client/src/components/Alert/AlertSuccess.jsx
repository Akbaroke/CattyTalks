import React from 'react'
import style from './style.module.scss'
import { useAlertState } from '../../zustand/alert-state'
import { IconX } from '@tabler/icons-react'

export default function AlertSuccess() {
  const { message, alertClose } = useAlertState(
    state => state
  )
  return (
    <div className={style.AlertSuccess}>
      <p>{message || 'Action Success.'}</p>
      <span onClick={alertClose}>
        <IconX />
      </span>
    </div>
  )
}
