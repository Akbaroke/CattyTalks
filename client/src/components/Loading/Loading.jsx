import React from 'react'
import style from './style.module.scss'

export default function Loading() {
  return (
    <div className={style.loading}>
      <div className={style.lds_ring}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <h1>Loading...</h1>
    </div>
  )
}
