const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const db = require("../database");

//Get all products in a gift shop
router.get("/all_products", (req, res, next) => {
  let location_id = req.query.location;
  db.query(
    "SELECT * FROM merchandise WHERE location_sold = ? ",
    [location_id],
    (err, results) => {
      if (err) throw err;
      rows = JSON.parse(JSON.stringify(results));
      res.send(rows);
    }
  );
});

//Purchase a product
router.post("/buy", (req, res, next) => {
  // Check if the stock is more than requested amount.
  db.query(
    "SELECT merchandise.stock_amount FROM merchandise WHERE item_id = ? ",
    [req.body.item_id],
    (err, results) => {
      rows = JSON.parse(JSON.stringify(results));
      if (rows[0].stock_amount > req.body.quantity_selected) {
        //Proceed with transaction.
        let transaction = {
          item_purchased: req.body.item_id,
          customer_id: req.body.user_id,
          quantity_purchased: req.body.quantity_selected,
          total_purchase_cost: req.body.amount_due,
          purchase_time: new Date()
        };
        db.query(
          "INSERT INTO purchase_history SET ? ",
          transaction,
          (err, reuslts) => {
            if (err) throw err;

            //Update the stock amount.
            db.query(
              "UPDATE merchandise SET stock_amount = ? WHERE item_id = ?",
              [
                rows[0].stock_amount - transaction.quantity_purchased,
                transaction.item_purchased,
              ],
              (err, results) => {
                if (err) throw err;
                return res.send(200);
              }
            );
          }
        );
      }
    }
  );
});

module.exports = router;
