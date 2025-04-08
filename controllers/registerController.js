const db = reqiure("../db/queries");
const bcrypt = require("bcryptjs");

async function postRegister(req, res, next) {
  try {
    const encryptedPassword = await bcrypt.hash(req.body.password, 10);
    await db.insertUser(
      req.body.username,
      encryptedPassword,
      req.body.firstname,
      req.body.lastname,
      false,
      false,
    );
  } catch (error) {
    console.log(error);
    next(error);
  }
}

module.exports = {
  postRegister,
};
