const router = require("express").Router();
const registerController = require("../controllers/registerController");
const joinController = require("../controllers/joinController");
const messageController = require("../controllers/messagesController");
const indexController = require("../controllers/indexController");
const loginController = require("../controllers/loginController");
const passport = require("passport");

const ensureJWT = passport.authenticate("jwt", { session: false });

// POST routes
router.post("/login", loginController.postLogin);

router.post("/messages/create", ensureJWT, messageController.postCreateMessage);

router.post("/register", registerController.postRegister);

router.post("/join", ensureJWT, joinController.postJoin);

router.post("/messages/:id/like", ensureJWT, messageController.postMessageLike);

// GET routes
router.get("/", indexController.getIndex);

router.get("/logout", ensureJWT, (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.get("/join", ensureJWT);

router.get("/messages/create", ensureJWT);

module.exports = router;
