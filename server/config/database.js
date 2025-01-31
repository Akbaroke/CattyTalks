import { Sequelize } from "sequelize";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import retry from "retry-as-promised";
import initModels from "../models/index.js"; // Panggil model setelah db dibuat

dotenv.config();

// Pastikan database sudah ada sebelum koneksi dibuat
async function ensureDatabaseExists() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  });

  await connection.query(
    `CREATE DATABASE IF NOT EXISTS \`${process.env.DB_DBNAME}\`;`
  );
  await connection.end();
}

await ensureDatabaseExists(); // Buat database jika belum ada

// Inisialisasi Sequelize
const db = new Sequelize(
  process.env.DB_DBNAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT,
    logging: false,
  }
);

// Opsi retry jika koneksi gagal
const sequelizeRetryOptions = {
  max: 10,
  match: [
    /SequelizeConnectionError/,
    /SequelizeConnectionRefusedError/,
    /SequelizeHostNotFoundError/,
    /SequelizeHostNotReachableError/,
    /SequelizeInvalidConnectionError/,
    /SequelizeConnectionTimedOutError/,
    /TimeoutError/,
  ],
};

// Fungsi retry koneksi database
async function retryDbConnect() {
  return retry.default(() => db.authenticate(), sequelizeRetryOptions);
}

// Inisialisasi semua model setelah `db` tersedia
const models = initModels(db);

// Sinkronisasi database dengan model
async function syncDatabase() {
  try {
    await retryDbConnect(); // Pastikan koneksi sukses dulu
    await db.sync({ alter: true }); // Sinkronisasi tabel sesuai model
    console.log("✅ Database & tabel siap!");
  } catch (error) {
    console.error("❌ Gagal sinkronisasi database:", error);
  }
}

// Jalankan sinkronisasi database
await syncDatabase();

// Ekspor db, models, dan fungsi lainnya
export { db, models, retryDbConnect, syncDatabase };
