const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("database connected with success");
  } catch (error) {
    console.log("database not connected");
  }
};

module.exports = connectDB;
