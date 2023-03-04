import React, { useEffect, useState } from 'react';
import style from './style.module.scss';
import Container from '../../components/container/Container';
import { IconLogout, IconPlus } from '@tabler/icons-react';
import CardListRoom from '../../components/card/cardListRoom/CardListRoom';
import axios from '../../api';
import { useSelector } from 'react-redux';
import CreateAndJoin from '../../components/createjoin/CreateAndJoin';

export default function Home() {
  const { id } = useSelector((state) => state.user);
  const [listRoom, setListRoom] = useState([]);
  const [openFrom, setOpenFrom] = useState(false);

  const getDataListRoom = async () => {
    if (id !== null) {
      try {
        const { data } = await axios.get(`/room/${id}`);
        setListRoom(data);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    getDataListRoom();
  }, [id]);

  const handleLogout = () => {
    window.open(`${import.meta.env.VITE_APP_URL}/auth/logout`, '_self');
  };

  const handleAddList = async () => {
    const { data } = await axios.post(`/room/create/${id}`, {
      name: 'Akbar Room',
    });
    getDataListRoom();
    console.log(data);
  };

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
            <p>{listRoom.length} of 3</p>
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
        <div className={style.btn_add} onClick={() => setOpenFrom(!openFrom)}>
          <div className={openFrom ? style.rotate : null}>
            <IconPlus />
          </div>
        </div>
      </div>
    </Container>
  );
}
