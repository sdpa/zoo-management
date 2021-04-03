var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
var { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
var db = require("../database.js");

//Login api
router.post(
  "/",
  [
    body("email").isEmail().isLength({ max: 25 }),
    body("password").isLength({ min: 4 }),
  ],
  async (req, res, next) => {
    //validate on incoming data.
    const err = validationResult(req);
    console.log(err);
    if (!err.isEmpty()) {
      return res.status(400).json({ errors: err.array() });
    }
    //Check if user already exists and match the password.

    //Get matching user from database
    let user = [];
    const email = req.body.email;

    db.query(
      "SELECT * FROM Users WHERE email = ? ",
      [email],
      (err, results) => {
        if (err) throw err;
        user = JSON.parse(JSON.stringify(results));
        if (user.length == 0) {
          return res.status(400).json({ error: "Account does not exist" });
        }
        console.log(user[0]);
        let hash = user[0].password;
        let password = req.body.password;
        // console.log(String.fromCharCode(binaryPass));
        // console.log(hashedPassword);
        bcrypt.compare(password, hash, (err, response) => {
          if (response == true) {
            res.status(200);
          } else {
            return res.status(400).json({ error: "Wrong Password" });
          }
        });
      }
    );
  }
);

module.exports = router;
