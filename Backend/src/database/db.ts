import mysql from "mysql2";

const connectionPool = mysql.createPool({
  user: process.env.DB_USERNAME,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
});

export default connectionPool;
