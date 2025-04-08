const router = require("express").Router();
const passport = require("passport");
const registerController = require("../controllers/registerController");

// POST routes
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
  }),
);

router.post("/register", registerController.postRegister);

// GET routes
router.get("/", (req, res) => {
  res.render("index", { user: req.user });
});

//router.get("/login", );

router.get("/register", registerController.getRegister);

module.exports = router;
