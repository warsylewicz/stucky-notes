const { Client, Pool } = require("pg");
let bcrypt = require("bcrypt");

const pool = new Pool();

// helper
const query = (text, params) => pool.query(text, params);

// ensure there is an admin account
const initialize = async () => {
  const client = new Client();
  await client.connect();
  const res = await client.query("SELECT * FROM users WHERE role_name='admin'");
  if (res.rowCount === 0) {
    await client.query(
      "INSERT INTO users (email, password, signed_in_count, last_signed_in, role_name) VALUES ($1, $2, $3, $4, $5)",
      [
        process.env.ADMIN_EMAIL,
        bcrypt.hashSync(process.env.ADMIN_PASSWORD, 12),
        0,
        new Date(),
        "admin",
      ]
    );
  }
  await client.end();
};

module.exports = {
  query,
  initialize,
};
