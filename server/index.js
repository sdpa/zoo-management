const express = require("express");
const cors = require("cors");
const mysql = require("mysql");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

//Initialize sql connection.
const con = mysql.createConnection({
  host: "database-1.cmkw6xcxraqi.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "admin1234",
});

con.connect((err) => {
  if (err) {
    throw err;
  } else {
    console.log("Connected to database!!");
  }
});
