const express = require("express");
const router = express.Router();
var bcrypt = require("bcrypt");
const db = require("../database");

//Get all employees
router.get("/all", (req, res, next) => {
  db.query(
    "SELECT employee.*, users.full_name, locations.location_name  FROM users, employee, locations  WHERE employee.user_id = users.user_id AND locations.location_id = employee.work_location AND employee.is_active = true",
    (err, results) => {
      if (err) throw err;
      result = JSON.parse(JSON.stringify(results));
      return res.send(result);
    }
  );
});

//Change employeee work location.
router.put("/change_work_location", (req, res, next) => {
  console.log(req.body);
  db.query(
    "UPDATE employee SET work_location = ? WHERE employee_id = ? ",
    [req.body.new_location, req.body.employee_id],
    (err, result) => {
      res.sendStatus(200);
    }
  );
});

router.delete("/delete/:id", (req, res, next) => {
  let employee_id = req.params.id;
  console.log(employee_id);
  console.log(req.params);
  console.log(req.body);
  db.query(
    "UPDATE employee SET is_active = ? WHERE employee_id = ? ",
    [false, employee_id],
    (err, results) => {
      if (err) throw err;
      console.log(results);
      //Get the user_id from the employee that was updated.
      db.query(
        "SELECT * FROM employee WHERE employee_id = ? ",
        [employee_id],
        (err, results) => {
          if (err) throw err;
          rows = JSON.parse(JSON.stringify(results));
          console.log("rows: ", rows);
          let user_id = rows[0].user_id;
          db.query(
            "UPDATE users SET is_active = ? WHERE user_id = ? ",
            [false, user_id],
            (err, results) => {
              if (err) throw err;
              return res.send(200);
            }
          );
        }
      );
      //update the users table to make the user account not active
    }
  );
});

//Get employee by id.
router.get("/:id", (req, res, next) => {
  let id = req.params.id;
  db.query(
    `SELECT employee.*, users.full_name, locations.location_name  FROM users, employee, locations  WHERE employee.user_id = users.user_id AND locations.location_id = employee.work_location AND employee.is_active = true AND employee.user_id = ${id}`,
    (err, results) => {
      if (err) throw err;
      result = JSON.parse(JSON.stringify(results));
      return res.send(result);
    }
  );
});

//Change Password of emplyoee.
router.post("/change_password", (req, res, next) => {
  //Check if current passwor matches.
  let current_pass = req.body.current_password;
  let new_pass = req.body.new_password;
  let id = req.body.user_id;
  console.log(req.body);

  db.query(`SELECT * FROM users WHERE users.user_id = ${id}`, (err, result) => {
    if (err) throw err;
    let user = JSON.parse(JSON.stringify(result))[0];
    console.log(user);
    let hash = user.pswd;
    bcrypt.compare(current_pass, hash, async (err, response) => {
      if (response == true) {
        //Update the new password.
        const hashedPassword = await bcrypt.hash(new_pass, 10);
        db.query(
          "UPDATE users SET ? WHERE users.user_id = ? ",
          [{ pswd: hashedPassword }, user.user_id],
          (err, results) => {
            if (err) throw err;
            console.log(results);
            console.log("Password changed!!");
            return res.sendStatus(200);
          }
        );
      } else {
        return res.status(400).json({ error: "Incorrect Current Password" });
      }
    });
  });
});

module.exports = router;
