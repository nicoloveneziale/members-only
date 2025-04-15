const router = require("express").Router();
const passport = require("passport");
const registerController = require("../controllers/registerController");
const joinController = require("../controllers/joinController");
const messageController = require("../controllers/messagesController");
const indexController = require("../controllers/indexController");

// POST routes
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  }),
);

router.post("/messages/create", messageController.postCreateMessage);

router.post("/register", registerController.postRegister);

router.post("/join", joinController.postJoin);

router.post("/messages/:id/like", messageController.postMessageLike);

// GET routes
router.get("/", indexController.getIndex);

router.get("/register", registerController.getRegister);

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.get("/join", joinController.getJoin);

router.get("/messages/create", messageController.getCreateMessage);

module.exports = router;
