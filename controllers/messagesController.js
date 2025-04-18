const db = require("../db/queries");

async function postCreateMessage(req, res) {
  try {
    const { title, text } = req.body;
    const now = new Date();
    const imagePath = req.file ? req.file.path : null;
    const message = await db.createMessage(
      title,
      now,
      text,
      req.user.id,
      imagePath,
    );
    res.status(201).json({
      message: "Message created successfully",
      data: message,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to create message" });
  }
}

async function postMessageLike(req, res) {
  try {
    const messageId = parseInt(req.params.id, 10);
    const userId = req.user.id;

    await db.likeMessage(messageId, userId);

    res.status(200).json({ message: "Message liked" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to like message" });
  }
}

async function getMessages(req, res) {
  try {
    const messages = await db.getAllMessages(req.params.sortBy);
    res.json(messages);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
}

async function getMessageLike(req, res) {
  try {
    const messageId = parseInt(req.params.id, 10);
    const userId = req.user.id;

    const like = await db.getMessageLike(messageId, userId);

    if (like) return res.json({ liked: true });
    return res.json({ liked: false });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to like message" });
  }
}

async function deleteMessage(req, res) {
  try {
    const messageId = parseInt(req.params.id, 10);
    const userId = req.user.id;
    if (userId != (await db.getMessage(messageId)).author_id)
      return res.status(401).json({ error: "Cannot delete other users post" });
    console.log("fine");
    db.deleteMessage(messageId);
    res.json({ message: "Message deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete message" });
  }
}

module.exports = {
  postCreateMessage,
  postMessageLike,
  getMessages,
  getMessageLike,
  deleteMessage,
};
