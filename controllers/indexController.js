const db = require("../db/queries");

async function getIndex(req, res) {
  try {
    const messages = await db.getAllMessages();
    res.render("index", {
      user: req.user ? req.user[0] : null,
      messages: messages,
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getIndex,
};
