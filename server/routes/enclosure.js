var express = require("express");
var router = express.Router();
var { body, validationResult } = require("express-validator");
import db from "../database";

//Get all encolusres
router.get("/", (req, res, next) => {
  let sql = `INSERT INTO locations WHERE location_type="Enclosure"`;
  db.connect((err) => {
    if (err) throw err;
    db.query(sql, (error, result) => {
      if (error) throw error;
      db.end();
      res.send(200).send(result);
    });
  });
});

//Create an enclosure
router.post(
  "/",
  [
    body("location_type").isEmail().isLength({ max: 25 }),
    body("location_name").isLength({ min: 4 }),
  ],
  (req, res, next) => {
    const err = validationResult(req);
    console.log(err);
    if (!err.isEmpty()) {
      return res.status(400).json({ errors: err.array() });
    }

    let body = req.body;
    console.log(body);

    //Object to insert
    let location = {
      location_type: body.location_type,
      location_name: body.location_name,
    };

    // //Make query
    let sql = `INSERT INTO locations SET ?`;

    //Open a connection and make a post request to the server.
    db.connect((err) => {
      if (err) throw err;
      db.query(sql, location, (error, result) => {
        if (error) throw error;
        db.end();
        res.send(200).send(result);
      });
    });
  }
);
