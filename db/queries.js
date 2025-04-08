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

module.exports = {
  insertUser,
};
