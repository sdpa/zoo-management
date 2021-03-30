var express = require("express");
var router = express.Router();
var { body, validationResult } = require("express-validator");
var db = require("../database");

//Create a location.
router.post(
  "/",
  [
    body("location_type").isIn(["Enclosure", "Restaurant"]),
    body("location_name").notEmpty(),
  ],
  (req, res, next) => {
    const err = validationResult(req);
    console.log(err);
    if (!err.isEmpty()) {
      return res.status(400).json({ errors: err.array() });
    }

    let body = req.body;

    //Object to insert
    let location = {
      location_type: body.location_type,
      location_name: body.location_name,
    };

    // Create the query
    let sql = `INSERT INTO locations SET ?`;

    //Make the query to database.
    db.connect((err) => {
      if (err) throw err;
      db.query(sql, location, (error, result) => {
        if (error) throw error;
        console.log(result);
        db.end();
        res.send("Location created");
      });
    });
  }
);

module.exports = router;
