const Post = require("../model/Posts");

exports.addPost = async (req, res) => {
  const { text } = req.body;
  try {
    const post = new Post({
      text,
      userId: req.user.id,
    });
    await post.save();
    res.status(201).json({ msg: "post created", post });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("userId", ["username"]);
    res.status(200).json({ msg: "all posts", posts });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
