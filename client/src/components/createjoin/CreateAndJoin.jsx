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
          {nav === 'create' ? <FormCrete /> : <FromJoin />}
        </div>
      </div>
    </div>
  )
}

const FromJoin = () => {
  const { mutate } = useSWRConfig()
  const [code, setCode] = useState('')
  const { id } = useSelector(state => state.user)
  const [isForm, setIsForm] = useState(false)
  const [loadingCode, setLoadingCode] = useState(false)
  const [msg, setMsg] = useState('')

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
    try {
      const { data } = await axios.post(
        `/room/join/${id}`,
        {
          code: code,
        }
      )
      console.log(data)
    } catch (error) {
      console.log(error)
    }
    mutate(`/room/join/${id}`)
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

const FormCrete = () => {
  const { mutate } = useSWRConfig()
  const { id } = useSelector(state => state.user)
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [isRandom, setIsRandom] = useState(false)
  const [isForm, setIsForm] = useState(false)
  const [loadingCode, setLoadingCode] = useState(false)
  const [isCodeValid, setIsCodeValid] = useState(false)
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
    setIsCodeValid(false)
    console.log(data)
  }

  const handlePressCode = async code => {
    setLoadingCode(true)
    try {
      const res = await axios.post(`/room/check/${id}`, {
        code: code,
      })
      if (res.status === 201) {
        setIsCodeValid(true)
      } else {
        setIsCodeValid(false)
      }
      setMsg(res.data.msg)
    } catch (error) {
      console.log(error)
    }
    setLoadingCode(false)
  }

  useEffect(() => {
    if (
      isCodeValid &&
      name.length > 3 &&
      name.length < 20
    ) {
      setIsForm(true)
    }
  }, [name, isCodeValid, code])

  useEffect(() => {
    if (isRandom) {
      setIsCodeValid(true)
      setCode('')
    }
    if (code.length === 6) {
      handlePressCode(code)
    }
  }, [isRandom, code])

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
        ) : isCodeValid ? (
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
        type="button"
        onClick={isForm ? onsubmit : null}
        className={
          isForm ? style.btnValid : style.btnDisable
        }>
        Create
      </button>
    </form>
  )
}
