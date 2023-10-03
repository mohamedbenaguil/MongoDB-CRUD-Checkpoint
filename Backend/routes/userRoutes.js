const express = require("express");
const isAuth = require("../Middleware/isAuth");
const upload = require("../Middleware/uploads");
const { updateProfileImage } = require("../Controllers/userControllers");
const router = express.Router();

router.patch(
  "/profileImage",
  isAuth,
  upload.single("myImage"),
  updateProfileImage
);

module.exports = router;
