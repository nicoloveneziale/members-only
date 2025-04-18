const router = require("express").Router();
const registerController = require("../controllers/registerController");
const joinController = require("../controllers/joinController");
const messageController = require("../controllers/messagesController");
const userController = require("../controllers/userController");
const loginController = require("../controllers/loginController");
const passport = require("passport");
const upload = require("../middleware/upload");

const ensureJWT = passport.authenticate("jwt", { session: false });

// POST routes
router.post("/login", loginController.postLogin);

router.post(
  "/messages/create",
  ensureJWT,
  upload.single("image"),
  messageController.postCreateMessage,
);

router.post("/register", registerController.postRegister);

router.post("/join", ensureJWT, joinController.postJoin);

router.post("/messages/:id/like", ensureJWT, messageController.postMessageLike);

// GET routes
router.get("/api/me", ensureJWT, userController.getCurrentUser);

router.get("/messages/:id/like", ensureJWT, messageController.getMessageLike);

router.get("/messages/:sortBy", messageController.getMessages);

// DELETE routes

router.delete("/messages/:id", ensureJWT, messageController.deleteMessage);

module.exports = router;
