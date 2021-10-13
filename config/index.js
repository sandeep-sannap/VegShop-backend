require("dotenv").config();

const { DB_URL, JWT_SECRET, LOCAL_DB } = process.env;

module.exports = { DB_URL, JWT_SECRET, LOCAL_DB };
