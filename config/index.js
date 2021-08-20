require("dotenv").config();

const { DEBUG_MODE, DB_URL, JWT_SECRET, APP_URL } = process.env;

module.exports = { DEBUG_MODE, DB_URL, JWT_SECRET, APP_URL };
