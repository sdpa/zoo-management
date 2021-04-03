var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
var { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
var db = require("../database.js");

let users = [
  {
    email: "user1@test1.com",
    password: "pass1",
  },
  {
    email: "user2@test2.com",
    password: "pass2",
  },
  {
    email: "user3@test3.com",
    password: "pass3",
  },
];

router.post(
  "/",
  [
    body("email")
      .isEmail()
      .withMessage("Enter valid Email")
      .isLength({ max: 25 })
      .withMessage("max length is 25"),
    body("password").isLength({ min: 4 }).withMessage("Minimum 4 Characters"),
  ],
  async (req, res, next) => {
    const err = validationResult(req);
    console.log(err);
    if (!err.isEmpty()) {
      return res.status(400).json({ errors: err.array() });
    }

    const email = req.body.email;
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    let user = [];
    //Get users in database
    db.query(
      "SELECT * FROM Users WHERE email = ? ",
      [email],
      (err, results) => {
        if (err) throw err;
        user = JSON.parse(JSON.stringify(results));
        console.log(user);
        if (user.length > 0) {
          console.log("lenght is 1");
          return res.status(400).json({ error: "Account already exists" });
        } else {
          let new_user = {
            email: req.body.email,
            password: hashedPassword,
          };
          //Crete user in database
          db.query("INSERT INTO Users SET ? ", new_user, (err, results) => {
            if (err) throw err;
            user = JSON.parse(JSON.stringify(results));
          });
          return res.status(200);
        }
      }
    );
  }
);

module.exports = router;
