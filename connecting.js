const { Pool } = require("pg");
const credentials = new Pool({
  user: "postgres",
  password: "password", // your password
  host: "localhost",
  port: 5432,
  database: "ExpressShopDB", // select your database
  ssl: false
});

module.exports = credentials;