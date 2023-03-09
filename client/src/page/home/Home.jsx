import React, { useState } from 'react'
import style from './style.module.scss'
import Container from '../../components/container/Container'
import { IconLogout, IconPlus } from '@tabler/icons-react'
import CardListRoom from '../../components/card/cardListRoom/CardListRoom'
import CreateAndJoin from '../../components/createjoin/CreateAndJoin'
import { useSWRContext } from '../../swr/swr-context'

export default function Home() {
  const [nav, setNav] = useState('My Room')
  const { room, join } = useSWRContext()
  const [openFrom, setOpenFrom] = useState(false)

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
              <CardListRoom data={data} key={index} />
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
              <CardListRoom data={data} key={index} />
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

  const MYROOM = 'My Room'
  const MYJOIN = 'My Join'
  return (
    <Container disable>
      {openFrom && <CreateAndJoin />}
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
                nav === MYROOM ? style.active : null
              }
              onClick={() => setNav(MYROOM)}>
              {nav !== MYROOM ? (
                MYROOM
              ) : (
                <>{room?.length || 0} of 3</>
              )}
            </div>
            <div
              className={
                nav === MYJOIN ? style.active : null
              }
              onClick={() => setNav(MYJOIN)}>
              {nav !== MYJOIN ? (
                MYJOIN
              ) : (
                <>
                  {room?.length || 0} of <p>&#8734;</p>
                </>
              )}
            </div>
          </div>
        </div>
        <div className={style.body}>
          {nav === MYROOM ? <MyRoom /> : <MyJoin />}
        </div>
        <div
          className={style.btn_add}
          onClick={() => setOpenFrom(!openFrom)}>
          <div className={openFrom ? style.rotate : null}>
            <IconPlus />
          </div>
        </div>
      </div>
    </Container>
  )
}
