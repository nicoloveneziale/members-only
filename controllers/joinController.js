const db = require("../db/queries");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function postJoin(req, res) {
  try {
    if (req.body.passcode === process.env.PASSCODE) {
      await db.updateMember(req.user.id);

      const token = jwt.sign({ id: req.user.id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      res.status(201).json({
        message: "User joined successfully",
        token: token,
      });
    } else {
      return res.status(400).json({ error: "Incorrect passcode" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "User join failed" });
  }
}

module.exports = {
  postJoin,
};
