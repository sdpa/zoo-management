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
  }
);

module.exports = router;
