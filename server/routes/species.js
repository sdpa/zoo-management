const express = require("express");
const router = express.Router();
const db = require("../database");

//Get all Species
router.get("/", (req, res, next) => {
  let sql = "SELECT * FROM species";

  let response = {};
  db.query(sql, (error, result) => {
    if (error) throw error;
    response = JSON.parse(JSON.stringify(result));
    return res.send(response);
  });
});

module.exports = router;
