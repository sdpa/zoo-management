var express = require("express");
var router = express.Router();
var { body, validationResult } = require("express-validator");
const db = require("../database");

//Get all messages
router.post("/", (req, res, next) => {
  let sql = `SELECT * FROM messages WHERE user_id = ? AND is_active = true`;
  db.query(sql, [req.body.user_id], (error, result) => {
    if (error) throw error;
    rows = JSON.parse(JSON.stringify(result));
    res.send(rows);
  });
});

router.delete("/delete/:id", (req, res, next) => {
  let message_id = req.params.id;
  let sql = `UPDATE messages SET is_active = false WHERE message_id = ? `;
  db.query(sql, [message_id], (error, result) => {
    if (error) throw error;
    rows = JSON.parse(JSON.stringify(result));
    res.send(200);
  });
});

module.exports = router;
