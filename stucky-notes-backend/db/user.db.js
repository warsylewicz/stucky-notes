const db = require("../db/utilities");

const findAll = async () => {
  const res = await db.query(
    "SELECT id, email, password, signed_in_count, last_signed_in, role_name FROM users WHERE role_name='user'"
  );
  if (process.env.DEBUG === "true") console.log(res);
  return res.rows;
};

const getUser = async (email) => {
  const res = await db.query(
    "SELECT id, email, password, signed_in_count, last_signed_in, role_name FROM users WHERE email=$1",
    [email]
  );
  if (process.env.DEBUG === "true") console.log(res);
  return res.rows.length === 1 ? res.rows[0] : null;
};

const deleteUser = async (email) => {
  const res = await db.query("DELETE FROM users WHERE email=$1", [email]);
  if (process.env.DEBUG === "true") console.log(res);
};

const insertUser = async (user) => {
  const res = await db.query(
    "INSERT INTO users (email, password, signed_in_count, last_signed_in, role_name) " +
    "VALUES ($1, $2, $3, $4, $5) RETURNING id",
    [user.email, user.password, user.signed_in_count, user.last_signed_in, user.role_name]
  );
  if (process.env.DEBUG === "true") console.log(res);
  return res.rows[0].id;
};

const updateUser = async (oldEmail, user) => {
  const res = await db.query(
    "UPDATE users SET email=$2, password=$3, signed_in_count=$4, last_signed_in=$5, role_name=$6 WHERE email=$1",
    [oldEmail, user.email, user.password, user.signed_in_count, user.last_signed_in, user.role_name]
  );
  if (process.env.DEBUG === "true") console.log(res);
};


module.exports = {
  findAll,
  getUser,
  insertUser,
  updateUser,
  deleteUser,
};
