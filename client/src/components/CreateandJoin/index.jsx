import React from 'react'
import globalType from '../../globalType'
import Create from './Create'
import { useFormModal } from '../../zustand/popup-state.js'
import style from './style.module.scss'
import Join from './Join'
import { IconX } from '@tabler/icons-react'

export default function index() {
  const { isOpen, type, unSet } = useFormModal(
    state => state
  )

  return (
    isOpen && (
      <div className={style.CreateAndJoin}>
        <div className={style.card}>
          <div className={style.nav}>
            <h1>{type} Room</h1>
            <span onClick={unSet}>
              <IconX />
            </span>
          </div>
          <div className={style.body}>
            {type === globalType.CREATE ? (
              <Create />
            ) : (
              <Join />
            )}
          </div>
        </div>
      </div>
    )
  )
}
