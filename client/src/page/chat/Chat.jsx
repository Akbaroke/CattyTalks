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
import { useSelector } from 'react-redux'
import getUnixTimestamp from '../../utils/unixTimestamp'
import axios from '../../api'
import ScrollToBottom from 'react-scroll-to-bottom'

export default function Chat() {
  const { code } = useParams()
  const navigate = useNavigate()
  const { id, name, profilePicture } = useSelector(
    state => state.user
  )
  const [userCount, setUserCount] = useState(0)
  const [currentMessage, setCurrentMessage] = useState('')
  const [messageList, setMessageList] = useState([])
  const socket = io.connect(import.meta.env.VITE_APP_URL)

  useEffect(() => {
    socket.on('receive_message', data => {
      setMessageList(list => [...list, data])
    })

    console.log(messageList)
  }, [socket])

  const getMessageHistory = async () => {
    const { data } = await axios.get(`/chat/${id}/${code}`)
    console.log(data)
  }

  useEffect(() => {
    socket.emit('join_room', code)
    socket.on('user_count_update', count => {
      setUserCount(count)
    })
    getMessageHistory()

    return () => {
      socket.emit('leave_room', code)
      socket.on('user_count_update', count => {
        setUserCount(count)
      })
    }
  }, [code])

  const handleSendMessage = async () => {
    if (currentMessage !== '') {
      const messageData = {
        room: code,
        id: id,
        name: name,
        profilePicture: profilePicture,
        message: currentMessage,
        time: getUnixTimestamp(),
      }
      await socket.emit('send_message', messageData)
      setMessageList(list => [...list, messageData])

      await axios.post(`/chat/${id}`, {
        room: code,
        message: currentMessage,
      })
      setCurrentMessage('')
    }
  }

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
        <ScrollToBottom className={style.body}>
          {messageList.map(messageContent => (
            <div>
              {messageContent.id !== id ? (
                <div>
                  <img
                    src={messageContent.profilePicture}
                    alt="chattytalks"
                  />
                  <p>{messageContent.name}</p>
                  <p>{messageContent.message}</p>
                  <p>{messageContent.time}</p>
                </div>
              ) : (
                <div>
                  <p>{messageContent.message}</p>
                  <p>{messageContent.time}</p>
                </div>
              )}
            </div>
          ))}
        </ScrollToBottom>
        <div className={style.footer}>
          <input
            type="text"
            placeholder="Type something"
            value={currentMessage}
            onChange={e =>
              setCurrentMessage(e.target.value)
            }
          />
          {currentMessage.replace(' ', '').length > 0 && (
            <div>
              <IconSend onClick={handleSendMessage} />
            </div>
          )}
        </div>
      </div>
    </Container>
  )
}
