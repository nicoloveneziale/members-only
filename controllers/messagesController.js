const db = require("../db/queries");

async function postCreateMessage(req, res, next) {
  try {
    const { title, text } = req.body;
    const datetime = new Date();
    await db.insertMessage(title, datetime, text, req.user[0].id);
    res.redirect("/");
  } catch (err) {
    console.log(err);
    next(err);
  }
}

function getCreateMessage(req, res) {
  res.render("createMessage", { errors: null });
}

module.exports = {
  postCreateMessage,
  getCreateMessage,
};
