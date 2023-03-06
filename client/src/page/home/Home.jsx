import React, { useEffect, useState } from 'react'
import style from './style.module.scss'
import Container from '../../components/container/Container'
import { IconLogout, IconPlus } from '@tabler/icons-react'
import CardListRoom from '../../components/card/cardListRoom/CardListRoom'
import CreateAndJoin from '../../components/createjoin/CreateAndJoin'
import { useSWRContext } from '../../swr/swr-context'
import io from 'socket.io-client'

export default function Home() {
  const { room } = useSWRContext()
  const [openFrom, setOpenFrom] = useState(false)

  const handleLogout = () => {
    window.open(
      `${import.meta.env.VITE_APP_URL}/auth/logout`,
      '_self'
    )
  }

  const connectServer = () => {
    const socket = io.connect(import.meta.env.VITE_APP_URL)
    socket.emit('join_room', '1')
    console.log(socket)
  }

  return (
    <Container disable>
      {openFrom && <CreateAndJoin />}
      <div className={style.home}>
        <div className={style.header}>
          <div>
            <h1>History Room</h1>
            <IconLogout onClick={handleLogout} />
          </div>
          <div>
            <p>{room?.length || 0} of 3</p>
          </div>
        </div>
        <div className={style.body}>
          {room?.length > 0 ? (
            <div className={style.myListRoom}>
              <div className={style.headerList}>
                <hr />
                <p>My Room</p>
                <hr />
              </div>
              <div className={style.listData}>
                {room.map((data, index) => (
                  <CardListRoom data={data} key={index} />
                ))}
              </div>
            </div>
          ) : (
            <div className={style.label_blankRoom}>
              <p>
                Create a room in advance to display history
              </p>
            </div>
          )}
        </div>
        <div
          className={style.btn_add}
          onClick={() => {
            setOpenFrom(!openFrom)
            connectServer()
          }}>
          <div className={openFrom ? style.rotate : null}>
            <IconPlus />
          </div>
        </div>
      </div>
    </Container>
  )
}
