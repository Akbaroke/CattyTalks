import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import retry from 'retry-as-promised'; // tambahkan baris ini
dotenv.config();

const db = new Sequelize(process.env.DB_DBNAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  port: process.env.DB_PORT,
});

const sequelizeRetryOptions = {
  max: 10,
  match: [/SequelizeConnectionError/, /SequelizeConnectionRefusedError/, /SequelizeHostNotFoundError/, /SequelizeHostNotReachableError/, /SequelizeInvalidConnectionError/, /SequelizeConnectionTimedOutError/, /TimeoutError/],
};

async function retryDbConnect() {
  return retry(() => db.authenticate(), sequelizeRetryOptions);
}

export default db;
export { retryDbConnect }; // tambahkan baris ini
