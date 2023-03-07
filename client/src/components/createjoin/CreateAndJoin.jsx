import React, { useEffect, useState } from 'react'
import style from './style.module.scss'
import numberOnly from '../../utils/numberOnly'
import { useSelector } from 'react-redux'
import axios from '../../api'
import { useSWRConfig } from 'swr'

export default function CreateAndJoin() {
  const [nav, setNav] = useState('create')

  return (
    <div className={style.CreateAndJoin}>
      <div className={style.card}>
        <div className={style.nav}>
          <div
            className={
              nav === 'create' ? style.active : null
            }
            onClick={() => setNav('create')}>
            Create
          </div>
          <div
            className={nav === 'join' ? style.active : null}
            onClick={() => setNav('join')}>
            Join
          </div>
        </div>
        <div className={style.body}>
          {nav === 'create' ? <FormCrete /> : null}
        </div>
      </div>
    </div>
  )
}

const FormCrete = () => {
  const { mutate } = useSWRConfig()
  const { id } = useSelector(state => state.user)
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [isRandom, setIsRandom] = useState(false)
  const [isValidate, setIsValidate] = useState(false)
  const [loadingCode, setLoadingCode] = useState(false)
  const [msg, setMsg] = useState('')

  const onsubmit = async e => {
    e.preventDefault()
    const { data } = await axios.post(
      `/room/create/${id}`,
      {
        name: name,
        code: isRandom ? undefined : code,
      }
    )
    mutate(`/room/${id}`)
    console.log(data)
  }

  const handlePressCode = async code => {
    setLoadingCode(true)
    try {
      const res = await axios.post(`/room/check/${id}`, {
        code: code,
      })
      if (res.status === 200) {
        setIsValidate(false)
      } else {
        name.length > 3 &&
          name.length < 20 &&
          setIsValidate(true)
      }
      setMsg(res.data.msg)
    } catch (error) {
      console.log(error)
    }
    setLoadingCode(false)
  }

  useEffect(() => {
    if (name.length > 3 && name.length < 20) {
      if (isRandom) {
        setIsValidate(true)
        console.log('tes')
        setCode('')
      } else {
        code.length === 6
          ? handlePressCode(code)
          : setIsValidate(false)
      }
    } else {
      setIsValidate(false)
    }
    
    isRandom && setCode('')
  }, [name, code, isRandom])

  return (
    <form className={style.crete}>
      <div className={style.fieldInput}>
        {name && <label htmlFor="name">Name room</label>}
        <input
          type="text"
          name="name"
          maxLength={20}
          placeholder="Name room"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>
      {!isRandom && (
        <div className={style.fieldInput}>
          {code && <label htmlFor="code">Code room</label>}
          <input
            onKeyDown={e => numberOnly(e)}
            type="text"
            maxLength={6}
            name="code"
            placeholder="Code (6 number)"
            value={code}
            onChange={e => setCode(e.target.value)}
          />
        </div>
      )}
      {code.length === 6 ? (
        loadingCode ? (
          <p className={style.labelLoading}>
            Check code...
          </p>
        ) : isValidate ? (
          <p className={style.labelValid}>{msg}</p>
        ) : (
          <p className={style.labelInValid}>{msg}</p>
        )
      ) : null}
      <div
        onClick={() => setIsRandom(!isRandom)}
        className={style.checkbox}>
        <input
          type="checkbox"
          name="random"
          checked={isRandom}
          onChange={() => setIsRandom(!isRandom)}
        />
        <label htmlFor="random">Random code</label>
      </div>
      <button
        onClick={isValidate ? onsubmit : null}
        className={
          isValidate ? style.btnValid : style.btnDisable
        }>
        Create
      </button>
    </form>
  )
}
