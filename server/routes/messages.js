var express = require("express");
var router = express.Router();
var { body, validationResult } = require("express-validator");
const db = require("../database");

//Get all encolusres
router.post("/", (req, res, next) => {
  let sql = `SELECT * FROM messages WHERE user_id = ? AND is_active = true`;
  db.query(sql, [req.body.user_id], (error, result) => {
    if (error) throw error;
    rows = JSON.parse(JSON.stringify(result));
    res.send(rows);
  });
});

module.exports = router;
