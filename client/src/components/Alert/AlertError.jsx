import React, { useEffect } from 'react'
import style from './style.module.scss'
import { useAlertState } from '../../zustand/alert-state'
import { IconX } from '@tabler/icons-react'

export default function AlertError() {
  const { message, alertClose } = useAlertState(
    state => state
  )

  return (
    <div className={style.AlertError}>
      <p>{message || 'Action Failed.'}</p>
      <span onClick={alertClose}>
        <IconX />
      </span>
    </div>
  )
}
