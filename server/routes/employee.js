const express = require("express");
const router = express.Router();
const db = require("../database");

//Get all employees
router.get("/all", (req, res, next) => {
  db.query(
    "SELECT employee.*, users.full_name, locations.location_name  FROM users, employee, locations  WHERE employee.user_id = users.user_id AND locations.location_id = employee.work_location",
    (err, results) => {
      if (err) throw err;
      result = JSON.parse(JSON.stringify(results));
      return res.send(result);
    }
  );
});

//Change employeee work location.
router.put("/change_work_location", (req, res, next) => {
  const new_location = req.body.new_location;
  //Get previos location.
  db.query(
    "SELECT * FROM employee WHERE employee_id = ? ",
    [req.body.employee_id],
    (err, results) => {
      if (err) throw err;
      // Check if the new location is different from previos location.
      const employee = JSON.parse(JSON.stringify(results))[0];
      const prev_location = employee.work_location;
      //   return res.send(200);

      //   Update the new location.
      db.query(
        "UPDATE employee SET work_location = ? WHERE employee_id = ? ",
        [new_location, req.body.employee_id],
        (err, results) => {
          if (err) throw err;
          // Check if the new location is different from previos location.
          //If different send a message.
          if (new_location != employee.work_location) {
            //First get the location names of old and new --> always return 2 items.
            db.query(
              "SELECT * FROM locations WHERE location_id = ? OR location_id = ? ",
              [prev_location, new_location],
              (err, results) => {
                if (err) throw err;
                rows = JSON.parse(JSON.stringify(results));
                const old_location_name = rows[0].location_name;
                const new_location_name = rows[1].location_name;
                const message = `You have been moved from ${old_location_name} to ${new_location_name}`;
                const input = {
                  user_id: employee.user_id,
                  message: message,
                  is_active: true,
                };
                db.query(
                  "INSERT INTO messages SET ? ",
                  input,
                  (err, results) => {
                    if (err) throw err;
                    return res.send(200);
                  }
                );
              }
            );
          } else {
            return res.send(200);
          }
        }
      );
    }
  );
});

//Delete employee.
router.delete("/delete", (req, res, next) => {
  employee_id = req.employee_id;
  db.query(
    "UPDATE employee SET is_active = ? WHERE employee_id = ? ",
    [false, req.body.employee_id],
    (err, results) => {
      if (err) throw err;
      console.log(resuls);
      //Get the user_id from the employee that was updated.
      db.query(
        "SELECT * FROM employee WHERE employee_id = ? ",
        [req.body.employee_id],
        (err, results) => {
          if (err) throw err;
          rows = JSON.parse(JSON.stringify(results));
          let user_id = rows[0].user_id;
        }
      );
      //update the users table to make the user account not active
      db.query(
        "UPDATE users SET is_active = ? WHERE employee_id = ? ",
        [false, user_id],
        (err, results) => {
          if (err) throw err;
          return res.send(200);
        }
      );
    }
  );
});

module.exports = router;
