const db = require("../db/queries");

async function getIndex(req, res) {
  try {
    const messages = await db.getAllMessages();
    res.json({
      user: req.user ? req.user : null,
      messages: messages,
    });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
}

module.exports = {
  getIndex,
};
