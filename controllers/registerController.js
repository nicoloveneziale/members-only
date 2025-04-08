const db = require("../db/queries");
const bcrypt = require("bcryptjs");

async function postRegister(req, res, next) {
  try {
    const encryptedPassword = await bcrypt.hash(req.body.password, 10);
    await db.insertUser(
      req.body.username,
      encryptedPassword,
      req.body.firstname,
      req.body.lastname,
    );
    res.redirect("/");
  } catch (error) {
    console.log(error);
    next(error);
  }
}

async function getRegister(req, res) {
  res.render("register");
}

module.exports = {
  postRegister,
  getRegister,
};
