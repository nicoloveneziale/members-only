const router = require("express").Router();
const passport = require("passport");
const registerController = require("../controllers/");

// POST routes
router.post("/login", passport.authenticate("local"));

router.post("/register", registerController.postRegister);

// GET routes
router.get("/");

router.get("/login");

router.get("/register");
