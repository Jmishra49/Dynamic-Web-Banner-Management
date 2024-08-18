const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Password",
  database: "launch_site",
});

db.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL Database");
});

// Remove or comment out authentication-related functions
// const createUser = (username, password, callback) => { ... };
// const authenticateUser = (username, password, callback) => { ... };

module.exports = {
  /* other exports if any */
};
