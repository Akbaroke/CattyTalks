import React, { useEffect, useState } from 'react'
import style from './style.module.scss'
import AlertSuccess from './AlertSuccess'
import AlertError from './AlertError'
import { useAlertState } from '../../zustand/alert-state'
import globalType from '../../globalType'
import Animated from 'react-mount-animation'

export default function index() {
  const { isOpen, type, alertClose } = useAlertState(
    state => state
  )

  useEffect(() => {
    isOpen &&
      setTimeout(() => {
        alertClose()
      }, 5000)
  }, [isOpen])

  return (
    <Animated.div
      show={isOpen}
      mountAnim={mountAnimation1}
      time={0.5}
      className={style.alert}>
      {type === globalType.SUCCESS && <AlertSuccess />}
      {type === globalType.ERROR && <AlertError />}
    </Animated.div>
  )
}

const mountAnimation1 = `
  0% {opacity: 0}
  0% {left: -300px}
  100% {opacity: 1}
`
