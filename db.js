require("dotenv").config();
const mongoose = require("mongoose");

const { DB_URL, LOCAL_DB } = require("./config");

module.exports = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Db connected");
  } catch (error) {
    console.log("Database connection failed");
    console.log(error);
  }
};
