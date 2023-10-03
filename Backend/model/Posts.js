const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Post", postSchema);
