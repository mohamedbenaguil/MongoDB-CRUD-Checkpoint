const express = require("express");
const { signUp, signIn, current } = require("../Controllers/authControllers");
const { registerRules, validator, loginRules } = require("../validator");
const isAuth = require("../Middleware/isAuth");

const router = express.Router();

// signup create new user
// @ route post /signUp
// @ acess public

router.post("/signUp", registerRules, validator, signUp);

router.post("/signIn", loginRules, validator, signIn);

router.get("/current", isAuth, current);

module.exports = router;
