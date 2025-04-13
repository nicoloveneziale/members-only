const db = require("../db/queries");
const dateFnsTz = require("date-fns-tz");
const { formatInTimeZone } = dateFnsTz;

async function postCreateMessage(req, res, next) {
  try {
    const { title, text } = req.body;
    const now = new Date();
    await db.insertMessage(title, now, text, req.user[0].id);
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
