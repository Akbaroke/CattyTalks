import { Server } from 'socket.io';
import dotenv from 'dotenv';
dotenv.config();

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: [process.env.CLIENT_URL, 'http://127.0.0.1:3000'],
      methods: ['GET', 'POST'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`);
    socket.on('join_room', (data) => {
      socket.join(data);
      console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });

    socket.on('send_message', (data) => {
      socket.to(data.room).emit('receive_message', data);
    });

    socket.on('disconnect', () => {
      console.log('User Disconnected', socket.id);
    });
  });

  return io;
};

export default initSocket;
