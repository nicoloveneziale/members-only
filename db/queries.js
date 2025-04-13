const pool = require("./pool");

async function insertUser(username, password, firstname, lastname) {
  await pool.query(
    `
        INSERT INTO users (username, password, firstname, lastname, membership_status, admin)
        VALUES ($1, $2, $3, $4, FALSE, FALSE)
        `,
    [username, password, firstname, lastname],
  );
}

async function getUserFromUsername(username) {
  const { rows } = await pool.query(
    `
      SELECT *
      FROM users
      WHERE username = ($1)
    `,
    [username],
  );
  return rows;
}

async function getUserFromId(id) {
  const { rows } = await pool.query(
    `
      SELECT *
      FROM users
      WHERE id = ($1)
    `,
    [id],
  );
  return rows;
}

async function updateMember(id) {
  await pool.query(
    `
      UPDATE users
      SET membership_status = True
      WHERE id = ($1)
    `,
    [id],
  );
}

async function insertMessage(title, date, text, authorId) {
  await pool.query(
    `
        INSERT INTO messages (title, date, text, author_id)
        VALUES ($1, $2, $3, $4, FALSE, FALSE)
    `,
    [title, date, text, authorId],
  );
}

module.exports = {
  insertUser,
  getUserFromUsername,
  getUserFromId,
  updateMember,
  insertMessage,
};
