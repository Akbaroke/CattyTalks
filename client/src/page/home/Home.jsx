import React, { useEffect, useState } from 'react'
import style from './style.module.scss'
import Container from '../../components/container/Container'
import {
  IconLogout,
  IconMessagePlus,
  IconMessageShare,
  IconPlus,
} from '@tabler/icons-react'
import CardListRoom from '../../components/card/cardListRoom/CardListRoom'
import CreateAndJoin from '../../components/CreateandJoin'
import { useSWRContext } from '../../swr/swr-context'
import globalType from '../../globalType'
import { useDispatch } from 'react-redux'
import { unsetRoom } from '../../redux/actions/room'
import { useFormModal } from '../../zustand/popup-state'

export default function Home() {
  const { room, join } = useSWRContext()
  const dispatch = useDispatch()
  const [nav, setNav] = useState('My Room')
  const [openFrom, setOpenFrom] = useState(false)
  const { createSet, joinSet } = useFormModal(
    state => state
  )

  useEffect(() => {
    dispatch(unsetRoom())
  }, [])

  const handleLogout = () => {
    window.open(
      `${import.meta.env.VITE_APP_URL}/auth/logout`,
      '_self'
    )
  }

  const reloadPage = () => {
    location.reload()
  }

  const MyRoom = () => (
    <>
      {room?.length > 0 ? (
        <div className={style.myListRoom}>
          <div className={style.headerList}>
            <hr />
            <p>My Room</p>
            <hr />
          </div>
          <div className={style.listData}>
            {room.map((data, index) => (
              <CardListRoom
                data={data}
                from={globalType.MYROOM}
                key={index}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className={style.label_blankRoom}>
          <p>Create a room in advance to display history</p>
        </div>
      )}
    </>
  )

  const MyJoin = () => (
    <>
      {join?.length > 0 ? (
        <div className={style.myListRoom}>
          <div className={style.headerList}>
            <hr />
            <p>My Join</p>
            <hr />
          </div>
          <div className={style.listData}>
            {join.map((data, index) => (
              <CardListRoom
                data={data}
                from={globalType.MYJOIN}
                key={index}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className={style.label_blankRoom}>
          <p>Join a room in advance to display history</p>
        </div>
      )}
    </>
  )

  return (
    <Container disable>
      {<CreateAndJoin />}
      <div className={style.home}>
        <div className={style.header}>
          <div>
            <div
              className={style.logo}
              onClick={reloadPage}>
              <img
                src="https://cdn.discordapp.com/attachments/1044968598587838586/1082668734986063883/logo_3_1asas.png"
                alt="Catty Talks"
                width={130}
              />
              <img
                src="https://cdn.discordapp.com/attachments/1044968598587838586/1082669520201723914/logo_1.png"
                alt="Catty Talks"
                width={40}
              />
            </div>
            <IconLogout onClick={handleLogout} />
          </div>
          <div className={style.nav}>
            <div
              className={
                nav === globalType.MYROOM
                  ? style.active
                  : null
              }
              onClick={() => setNav(globalType.MYROOM)}>
              {nav !== globalType.MYROOM ? (
                globalType.MYROOM
              ) : (
                <>{room?.length || 0} of 3</>
              )}
            </div>
            <div
              className={
                nav === globalType.MYJOIN
                  ? style.active
                  : null
              }
              onClick={() => setNav(globalType.MYJOIN)}>
              {nav !== globalType.MYJOIN ? (
                globalType.MYJOIN
              ) : (
                <>
                  {room?.length || 0} of <p>&#8734;</p>
                </>
              )}
            </div>
          </div>
        </div>
        <div className={style.body}>
          {nav === globalType.MYROOM ? (
            <MyRoom />
          ) : (
            <MyJoin />
          )}
        </div>
        {nav === globalType.MYROOM ? (
          <div
            className={style.btn_createRoom}
            onClick={createSet}>
            <IconMessagePlus />
          </div>
        ) : (
          <div
            className={style.btn_joinRoom}
            onClick={joinSet}>
            <IconMessageShare />
          </div>
        )}
      </div>
    </Container>
  )
}
