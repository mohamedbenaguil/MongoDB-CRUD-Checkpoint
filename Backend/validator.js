const { body, validationResult } = require("express-validator");

const registerRules = [
  body("username", "username is required").notEmpty(),
  body("email", "email is required").isEmail(),
  body("password", "password must have 6 charactere").isLength({ min: 6 }),
];

const verifyPost = [body("text", "text is required").notEmpty()];

const validator = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

const loginRules = [
  body("email", "email is required").isEmail(),
  body("password", "password must have 6 charactere").notEmpty(),
];

module.exports = { registerRules, validator, loginRules, verifyPost };
