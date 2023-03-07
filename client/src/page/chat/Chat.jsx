import React, { useEffect, useState } from 'react'
import style from './style.module.scss'
import Container from '../../components/container/Container'
import { useNavigate, useParams } from 'react-router-dom'
import io from 'socket.io-client'
import {
  IconArrowLeft,
  IconDotsVertical,
} from '@tabler/icons-react'
import { IconSend } from '@tabler/icons-react'

export default function Chat() {
  const { code } = useParams()
  const navigate = useNavigate()
  const [userCount, setUserCount] = useState(0)
  const socket = io.connect(import.meta.env.VITE_APP_URL)

  useEffect(() => {
    socket.emit('join_room', code)
    socket.on('user_count_update', count => {
      setUserCount(count)
    })

    return () => {
      socket.emit('leave_room', code)
      socket.on('user_count_update', count => {
        setUserCount(count)
      })
    }
  }, [code])

  return (
    <Container>
      <div className={style.main}>
        <div className={style.header}>
          <div className={style.label}>
            <IconArrowLeft onClick={() => navigate('/')} />
            <div>
              <p>Lorem ipsum | {code}</p>
              <p>{userCount} online</p>
            </div>
          </div>
          <IconDotsVertical />
        </div>
        <div className={style.body}></div>
        <div className={style.footer}>
          <input type="text" placeholder="Type something" />
          <div>
            <IconSend />
          </div>
        </div>
      </div>
    </Container>
  )
}
