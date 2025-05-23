const db = require("../db/queries");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
require("dotenv").config();

const validateUser = [
  body("firstname")
    .trim()
    .isAlpha()
    .withMessage("Must only contain letters")
    .isLength({ min: 1, max: 10 })
    .withMessage("First name must be between 1-10 character"),
  body("lastname")
    .trim()
    .isAlpha()
    .withMessage("Must only contain letters")
    .isLength({ min: 1, max: 10 })
    .withMessage("Last name must be between 1-10 character"),
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
    .isLength({ min: 8, max: 30 })
    .withMessage("Password must be between 8-30 characters")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/\d/)
    .withMessage("Password must contain at least one number"),
];

const postRegister = [
  validateUser,
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const encryptedPassword = await bcrypt.hash(req.body.password, 10);
      const user = await db.createUser(
        req.body.username,
        encryptedPassword,
        req.body.firstname,
        req.body.lastname,
      );

      if (!user) return res.status(500).json({ errors: errors });

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      req.user = user;
      req.token = token;
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },
];

module.exports = {
  postRegister,
};
