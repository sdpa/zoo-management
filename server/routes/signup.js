var express = require("express");
var router = express.Router();
var bcrypt = require("bcrypt");
var { body, validationResult } = require("express-validator");
var db = require("../database.js");

router.post(
  "/",
  [
    body("full_name").notEmpty().withMessage("Required"),
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
      "SELECT * FROM users WHERE email = ? ",
      [email],
      (err, results) => {
        if (err) throw err;
        user = JSON.parse(JSON.stringify(results));
        console.log(user);
        if (user.length > 0) {
          console.log("lenght is 1");
          return res.status(400).json({ error: "Account already exists" });
        } else {
          user = user[0];
          var today = new Date();
          var dd = today.getDate();

          var mm = today.getMonth() + 1;
          var yyyy = today.getFullYear();
          if (dd < 10) {
            dd = "0" + dd;
          }

          if (mm < 10) {
            mm = "0" + mm;
          }
          today = yyyy + "-" + mm + "-" + dd;
          let new_user = {
            full_name: req.body.full_name,
            email: req.body.email,
            pswd: hashedPassword,
            date_created: today,
            role_id: req.body.role_id,
            is_active: true,
          };
          console.log("Today: ", today);
          // Crete user in database
          db.query("INSERT INTO users SET ? ", new_user, (err, results) => {
            if (err) throw err;
            console.log(results);
            db.query(
              "SELECT * FROM users WHERE email = ? ",
              [req.body.email],
              (err, results) => {
                user = JSON.parse(JSON.stringify(results))[0];
                if (user.role_id == "Employee") {
                  console.log("Role is is employee");
                  let new_employee = {
                    job_title: req.body.job_title,
                    user_id: user.user_id,
                    wage: 30.0,
                    work_location: req.body.work_location,
                  };
                  db.query(
                    "INSERT INTO employee SET ? ",
                    new_employee,
                    (err, results) => {
                      if (err) throw err;
                      return res.send(`Added ${user.full_name} to zoo.`);
                    }
                  );
                } else {
                  console.log("Role is not employee");
                  let result = {
                    user_id: user.user_id,
                    role_id: user.role_id,
                    full_name: user.full_name,
                  };
                  return res.send(result);
                }
              }
            );
          });
        }
      }
    );
  }
);

module.exports = router;
