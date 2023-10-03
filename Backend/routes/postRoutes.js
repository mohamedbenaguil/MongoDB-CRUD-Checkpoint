const express = require("express");
const { addPost, getAllPosts } = require("../Controllers/postControllers");
const { verifyPost, validator } = require("../validator");
const isAuth = require("../Middleware/isAuth");

const router = express.Router();

router.post("/", isAuth, verifyPost, validator, addPost);
router.get("/", getAllPosts);

module.exports = router;
