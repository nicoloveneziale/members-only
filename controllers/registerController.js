const db = require("../db/queries");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

const validateUser = [
  body("firstname")
    .trim()
    .isAlpha()
    .withMessage("Must only contain letters")
    .isLength({ min: 1, max: 10 })
    .withMessage("First name must be between 1-10"),
  body("lastname")
    .trim()
    .isAlpha()
    .withMessage("Must only contain letters")
    .isLength({ min: 1, max: 10 })
    .withMessage("Last name must be between 1-10"),
  body("username")
    .trim()
    .isLength({ min: 3, max: 12 })
    .withMessage("Username must be between 3-12")
    .custom(async (value) => {
      const user = await db.findUserFromUsername(value);
      if (user) {
        throw new Error("Username already in use");
      }
    })
    .withMessage("Username already in use"),
  body("password")
    .trim()
    .isLength({ min: 6, max: 30 })
    .withMessage("First name must be between 6-30"),
];

const postRegister = [
  validateUser,
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render("register", { errors: errors.array() });
      }
      const encryptedPassword = await bcrypt.hash(req.body.password, 10);
      await db.createUser(
        req.body.username,
        encryptedPassword,
        req.body.firstname,
        req.body.lastname,
      );
      res.redirect("/");
    } catch (error) {
      console.log(error);
      next(error);
    }
  },
];

async function getRegister(req, res) {
  res.render("register");
}

module.exports = {
  postRegister,
  getRegister,
};
