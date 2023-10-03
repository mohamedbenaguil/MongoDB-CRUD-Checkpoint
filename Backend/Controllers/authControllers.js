const User = require("../model/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = new User({ username, email, password });
    user.password = await bcrypt.hash(password, 10);
    const userexist = await User.findOne({ email });
    if (userexist) {
      return res
        .status(409)
        .json({ errors: [{ msg: "email already exists" }] });
    }
    await user.save();
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, process.env.secretkey, { expiresIn: "3d" });

    res.status(201).json({
      msg: "user created",
      user: { username: user.username, email: user.email, _id: user._id },
      token,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: "bad credential" }] });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "bad credential" }] });
    }

    // generate token
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, process.env.secretkey, { expiresIn: "3d" });
    res.status(201).json({
      msg: "user login with success",
      user: { username: user.username, email: user.email, _id: user._id },
      token,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.current = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).lean().exec();
    const { password, ...rest } = user;
    res.send(rest);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
