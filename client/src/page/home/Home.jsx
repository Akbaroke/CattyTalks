import React from 'react';
import style from './style.module.scss';
import Container from '../../components/container/Container';
import { IconLogout, IconPlus } from '@tabler/icons-react';
import CardListRoom from '../../components/card/cardListRoom/CardListRoom';
import axios from '../../api';
import { useSelector } from 'react-redux';

const listRoom = [
  {
    code: '546879',
    name: 'Akbar Room',
    hostName: 'Muhammad Akbar',
    time: '3 hours ago',
  },
  {
    code: '546879',
    name: 'Akbar Room',
    hostName: 'Muhammad Akbar',
    time: '3 hours ago',
  },
];

export default function Home() {
  const { id } = useSelector((state) => state.user);
  const handleLogout = () => {
    window.open(`${import.meta.env.VITE_APP_URL}/auth/logout`, '_self');
  };

  const handleAddList = async () => {
    const { data } = await axios.get(`/room/create/${id}`);
    console.log(data);
  };

  return (
    <Container disable>
      <div className={style.home}>
        <div className={style.header}>
          <div>
            <h1>History Room</h1>
            <IconLogout onClick={handleLogout} />
          </div>
          <div>
            <p>0 of 3</p>
          </div>
        </div>
        <div className={style.body}>
          {listRoom?.length > 0 ? (
            <div className={style.myListRoom}>
              <div className={style.headerList}>
                <hr />
                <p>My Room</p>
                <hr />
              </div>
              <div className={style.listData}>
                {listRoom.map((data, index) => (
                  <CardListRoom data={data} key={index} />
                ))}
              </div>
            </div>
          ) : (
            <div className={style.label_blankRoom}>
              <p>Create a room in advance to display history</p>
            </div>
          )}
        </div>
        <div className={style.btn_add} onClick={handleAddList}>
          <div>
            <IconPlus />
          </div>
        </div>
      </div>
    </Container>
  );
}
