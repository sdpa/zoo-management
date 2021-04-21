const express = require("express");
const router = express.Router();
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

module.exports = router;
