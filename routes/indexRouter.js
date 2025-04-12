const router = require("express").Router();
const passport = require("passport");
const registerController = require("../controllers/registerController");
const joinController = require("../controllers/joinController");

// POST routes
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  }),
);

router.post("/register", registerController.postRegister);

router.post("/join", joinController.postJoin);

// GET routes
router.get("/", (req, res) => {
  res.render("index", { user: req.user ? req.user[0] : null });
});

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

module.exports = router;
