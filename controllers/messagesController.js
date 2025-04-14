const db = require("../db/queries");

async function postCreateMessage(req, res, next) {
  try {
    const { title, text } = req.body;
    const now = new Date();
    await db.createMessage(title, now, text, req.user.id);
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
