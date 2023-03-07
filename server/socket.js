import { Server } from 'socket.io';
import dotenv from 'dotenv';
dotenv.config();

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.CLIENT_URL,
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    const updateCount = (room) => {
      const count = io.sockets.adapter.rooms.get(room)?.size || 0;
      io.to(room).emit('user_count_update', count);
    };

    let roomName = '';

    socket.on('join_room', (room) => {
      socket.join(room);
      console.log(`User with ID: ${socket.id} joined room: ${room}`);
      roomName = room;
      updateCount(room);
    });

    socket.on('leave_room', (room) => {
      socket.leave(room);
      console.log(`User with ID: ${socket.id} left room: ${room}`);
      updateCount(room);
    });

    socket.on('send_message', (data) => {
      socket.to(data.room).emit('receive_message', data);
    });

    socket.on('disconnect', () => {
      if (roomName) {
        console.log(`User Disconnected from room ${roomName}`);
        updateCount(roomName);
      }
    });
  });

  return io;
};

export default initSocket;
