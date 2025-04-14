const db = require("../db/queries");
require("dotenv").config();

async function postJoin(req, res, next) {
  try {
    if (req.body.passcode === process.env.PASSCODE) {
      await db.updateMember(req.user.id);
      res.redirect("/");
    } else {
      return res.status(400).render("join", { error: "Incorrect passcode" });
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
}

function getJoin(req, res) {
  res.render("join", { error: null });
}

module.exports = {
  postJoin,
  getJoin,
};
