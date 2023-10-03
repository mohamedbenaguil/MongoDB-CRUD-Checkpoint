const User = require("../model/Users");

exports.updateProfileImage = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user.id, {
      $set: { imageUrl: req.file.filename },
    });
    res.send("image uploaded with success");
  } catch (error) {
    res.status(500).json({ msg: " server error" });
  }
};
