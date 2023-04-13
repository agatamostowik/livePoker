import postgresql from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = postgresql;

const pool = new Pool({
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  host: process.env.PGHOST,
  port: process.env.PGPORT,
});

export const query = async (command: string) => {
  try {
    const client = await pool.connect();

    const response = await client.query(command);

    client.release();

    return response.rows;
  } catch (error) {
    throw error;
  }
};
