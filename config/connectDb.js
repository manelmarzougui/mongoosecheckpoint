const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/users");
    console.log("database connected");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDb;
