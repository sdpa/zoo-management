var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
var { body, validationResult } = require("express-validator");
var db = require("../database.js");

//Login api
router.post(
  "/",
  [
    body("email").isEmail().isLength({ max: 50 }),
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
      "SELECT * FROM users WHERE email = ? ",
      [email],
      (err, results) => {
        if (err) throw err;
        user = JSON.parse(JSON.stringify(results));
        if (user.length == 0) {
          return res.status(400).json({ error: "Account does not exist" });
        }
        console.log(user[0]);
        let hash = user[0].pswd;
        let password = req.body.password;
        bcrypt.compare(password, hash, (err, response) => {
          if (response == true) {
            user = user[0];
            let result = {
              user_id: user.user_id,
              role_id: user.role_id,
              full_name: user.full_name,
            };
            console.log(result);
            res.send(result);
          } else {
            return res.status(400).json({ error: "Wrong Password" });
          }
        });
      }
    );
  }
);

module.exports = router;
