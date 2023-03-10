import React, { useEffect, useRef, useState } from 'react'
import style from './style.module.scss'
import Container from '../../components/container/Container'
import { useNavigate } from 'react-router-dom'
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
import epochToTime from '../../utils/epochToTime'
import DefaultProfilePicture from '../../assets/DefaultProfilePicture.png'

export default function Chat() {
  const navigate = useNavigate()
  const { id, name, profilePicture } = useSelector(
    state => state.user
  )
  const room = useSelector(state => state.room)
  const [userCount, setUserCount] = useState(0)
  const [currentMessage, setCurrentMessage] = useState('')
  const [messageList, setMessageList] = useState([])
  const socketRef = useRef(null)
  const [heightTextArea, setHeightTextArea] = useState(50)

  const getMessageHistory = async () => {
    const { data } = await axios.get(
      `/chat/${id}/${room.code}`
    )
    console.log(data)
    setMessageList(data)
  }

  useEffect(() => {
    !room.code && navigate('/')
  }, [])

  useEffect(() => {
    socketRef.current = io(import.meta.env.VITE_APP_URL)
    socketRef.current.emit('join_room', room.code)
    socketRef.current.on('user_count_update', count => {
      setUserCount(count)
    })
    getMessageHistory()

    return () => {
      socketRef.current.emit('leave_room', room.code)
      socketRef.current.off('user_count_update')
    }
  }, [room.code])

  const handleSendMessage = async () => {
    if (currentMessage !== '') {
      const messageToSend = {
        room: room.code,
        id_user: id,
        name: name,
        profile_picture: profilePicture,
        message: currentMessage,
        time: getUnixTimestamp(),
      }
      await socketRef.current.emit(
        'send_message',
        messageToSend
      )
      setMessageList(list => [...list, messageToSend])
      setCurrentMessage('')
      await axios.post(`/chat/${id}`, {
        room: room.code,
        message: messageToSend.message,
      })
    }
  }

  useEffect(() => {
    const receiveMessageHandler = data => {
      setMessageList(list => [...list, data])
    }
    socketRef.current.on(
      'receive_message',
      receiveMessageHandler
    )
    return () => {
      socketRef.current.off(
        'receive_message',
        receiveMessageHandler
      )
    }
  }, [])

  const handleChange = e => {
    setCurrentMessage(e.target.value)
    setHeightTextArea(e.target.scrollHeight)
    if (e.target.scrollHeight <= 50) {
      setHeightTextArea(50)
    }
    if (e.target.value.length <= 20) {
      setHeightTextArea(50)
    }
  }

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSendMessage()
      setHeightTextArea(50)
    } else if (e.key === 'Backspace') {
      if (e.target.scrollHeight <= 50) {
        console.log()
        setHeightTextArea(50)
      } else {
        setHeightTextArea(e.target.scrollHeight - 10)
      }
    }
  }

  return (
    <Container>
      <div className={style.main}>
        <div className={style.header}>
          <div className={style.label}>
            <IconArrowLeft onClick={() => navigate('/')} />
            <div>
              <p>
                {room.name} | {room.code}
              </p>
              <p>{userCount} online</p>
            </div>
          </div>
          <IconDotsVertical />
        </div>
        <ScrollToBottom className={style.body}>
          {messageList
            .sort((a, b) => a.id - b.id)
            .map((messageContent, index) => (
              <div
                key={index}
                className={
                  messageContent.id_user !== id
                    ? style.otherChat
                    : style.meChat
                }>
                {messageContent.id_user !== id ? (
                  <>
                    <img
                      src={
                        messageContent.profile_picture ||
                        DefaultProfilePicture
                      }
                    />
                    <div>
                      <div>
                        <p>{messageContent.name}</p>
                        <p>
                          {epochToTime(messageContent.time)}
                        </p>
                      </div>
                      <p>
                        {messageContent.trash ? (
                          <i>Pesan telah terhapus.</i>
                        ) : (
                          messageContent.message
                        )}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <p>
                      {epochToTime(messageContent.time)}
                    </p>
                    <p>
                      {messageContent.trash ? (
                        <i>Pesan telah terhapus.</i>
                      ) : (
                        messageContent.message
                      )}
                    </p>
                  </>
                )}
              </div>
            ))}
        </ScrollToBottom>
        <div className={style.footer}>
          <textarea
            type="text"
            placeholder="Type something"
            value={currentMessage}
            maxLength={300}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            style={{ height: heightTextArea }}
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
