const express = require("express");
const router = express.Router();
const db = require("../database");

//Enter an item purchased into zoo
router.post("/", (req, res) => {
  let body = req.body;
  let purchased = {
    item_purchased: body.item_purchased, 
    customer_id: body.customer_id,
    quantity_purchased: body.quantity_purchased,
    total_purchase_cost: body.total_purchase_cost,
    purchase_time: body.purchase_time,
    ticket_date: body.ticket_date, 
  };

  console.log(req.body);

  let sql = "INSERT INTO purchase_history SET ?";

  let response = {};
  db.query(sql, purchased, (error, result) => {
    if (error) throw error;
    response = JSON.parse(JSON.stringify(result));
    return res.send(response);
  });
});

// retrieve purchase history
router.get("/history", (req, res) => {
  
  let userID = parseInt(req.query.userID);
  let sql = "SELECT * FROM purchase_history where customer_id=?";

  let response = {};
  db.query(sql, [userID], (error, result) => {
    if (error) throw error;
    response = JSON.parse(JSON.stringify(result));
    return res.send(response);
  });
});

module.exports = router;
