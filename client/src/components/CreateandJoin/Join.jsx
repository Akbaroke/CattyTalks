import React, { useEffect, useState } from 'react'
import style from './style.module.scss'
import { useSelector } from 'react-redux'
import { useSWRConfig } from 'swr'
import axios from '../../api'
import { useFormModal } from '../../zustand/popup-state'
import numberOnly from '../../utils/numberOnly'
import { useLoadingState } from '../../zustand/loading-state'
import { useAlertState } from '../../zustand/alert-state'

export default function Join() {
  const { mutate } = useSWRConfig()
  const { unSet } = useFormModal(state => state)
  const [code, setCode] = useState('')
  const { id } = useSelector(state => state.user)
  const [isForm, setIsForm] = useState(false)
  const [loadingCode, setLoadingCode] = useState(false)
  const [msg, setMsg] = useState('')
  const { loadingSet, loadingUnset } = useLoadingState(
    state => state
  )
  const { alertOpenSuccess, alertOpenError } =
    useAlertState(state => state)

  const handlePressCode = async code => {
    setLoadingCode(true)
    try {
      const res = await axios.get(
        `/room/check/${id}/${code}`
      )
      if (res.status === 200) {
        setIsForm(true)
      } else {
        setIsForm(false)
      }
      setMsg(res.data.msg)
    } catch (error) {
      console.log(error)
    }
    setLoadingCode(false)
  }

  useEffect(() => {
    code.length === 6
      ? handlePressCode(code)
      : setIsForm(false)
  }, [code])

  const onsubmit = async () => {
    loadingSet()
    try {
      const { data } = await axios.post(
        `/room/join/${id}`,
        {
          code: code,
        }
      )
      mutate('/room/join')
      alertOpenSuccess(data.msg)
    } catch (error) {
      alertOpenError(error.response.data.msg)
    }
    unSet()
    loadingUnset()
  }

  return (
    <form className={style.join}>
      <div className={style.fieldInput}>
        {code && <label htmlFor="code">Code room</label>}
        <input
          type="text"
          name="code"
          maxLength={6}
          placeholder="Code (6 number)"
          value={code}
          onKeyDown={e => numberOnly(e)}
          onChange={e => setCode(e.target.value)}
        />
      </div>
      <span>
        {code.length === 6 ? (
          loadingCode ? (
            <p className={style.labelLoading}>
              Check code...
            </p>
          ) : isForm ? (
            <p className={style.labelValid}>{msg}</p>
          ) : (
            <p className={style.labelInValid}>{msg}</p>
          )
        ) : null}
      </span>
      <button
        type="button"
        onClick={isForm ? onsubmit : null}
        className={
          isForm ? style.btnValid : style.btnDisable
        }>
        Join
      </button>
    </form>
  )
}
