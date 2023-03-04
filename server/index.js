import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import passport from 'passport';
import authRoute from './routes/auth.js';
import roomRoute from './routes/room.js';
import cookieSession from 'cookie-session';
import db from './config/database.js';
import './passport.js';

const app = express();

try {
  db.authenticate();
  console.log('Database is Connected...');
} catch (error) {
  console.log(error);
}

app.use(
  cookieSession({
    name: 'session',
    keys: ['cyberwolve'],
    maxAge: 24 * 60 * 60 * 100,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);

app.use(express.json());
app.use('/auth', authRoute);
app.use('/room', roomRoute);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listenting on port ${port}...`));
