const mysql = require("mysql");

//Initialize sql connection.
const db = mysql.createConnection({
  host: "database-1.cmkw6xcxraqi.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "admin1234",
  database: "zoo_db",
});

db.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("Connected to database");
  }
});

module.exports = db;
