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

async function postMessageLike(req, res) {
  try {
    const messageId = parseInt(req.params.id);
    const userId = req.user.id;
    res.redirect("/");
    await db.likeMessage(messageId, userId);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  postCreateMessage,
  getCreateMessage,
  postMessageLike,
};
