const db = require("../db/queries");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config();

async function postLogin(req, res) {
  try {
    const user = await db.findUserFromUsername(req.body.username);
    console.log(user);
    if (!user) return res.status(401).json({ message: "Invalid username" });

    const match = bcrypt.compare(req.body.password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ token });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
}

module.exports = {
  postLogin,
};
