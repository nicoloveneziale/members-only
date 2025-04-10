const router = require("express").Router();
const passport = require("passport");
const registerController = require("../controllers/registerController");

// POST routes
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  }),
);

router.post("/register", registerController.postRegister);

// GET routes
router.get("/", (req, res) => {
  res.render("index", { user: req.user });
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

module.exports = router;
