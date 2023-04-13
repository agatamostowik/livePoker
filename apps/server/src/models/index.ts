import { query } from "../db";

type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export const getUserByEmail = async (email: User["email"]) => {
  const queryString = `SELECT * FROM users WHERE email = '${email}';`;

  const result = await query(queryString);

  return result[0];
};

export const getUserById = async (id: User["id"]) => {
  const queryString = `SELECT * FROM users WHERE id = '${id}';`;

  const result = await query(queryString);

  return result[0];
};

export const createUser = async (encryptedUser: User) => {
  const { name, email, password } = encryptedUser;

  const queryString = `INSERT INTO users ("name", "email", "password") VALUES ('${name}', '${email}', '${password}') RETURNING "id", "name", "email";`;

  const result = await query(queryString);

  return result[0];
};
