const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const db = require("../database");

//Get all products in a gift shop
router.get("/all_products", (req, res, next) => {
  let location_id = req.query.location;
  db.query(
    "SELECT * FROM merchandise WHERE (location_sold = ? AND active=true)",
    [location_id],
    (err, results) => {
      if (err) throw err;
      rows = JSON.parse(JSON.stringify(results));
      res.send(rows);
    }
  );
});

router.get("/all", (req, res) => {
  db.query("SELECT * FROM merchandise", (err, results) => {
    if (err) throw err;
    rows = JSON.parse(JSON.stringify(results));
    res.send(rows);
  });
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
          purchase_time: new Date(),
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

router.put("/change_stock", (req, res, next) => {
  //Get animal from database
  console.log(req.body);
  db.query(
    "SELECT * FROM merchandise WHERE item_id = ? ",
    [req.body.item_id],
    (err, results) => {
      if (err) throw err;
      item = JSON.parse(JSON.stringify(results))[0];
      let current_stock = item.stock_amount;
      let new_stock = parseInt(req.body.stock_amount) + parseInt(current_stock);

      db.query(
        "UPDATE merchandise SET ? where item_id = ? ",
        [{ stock_amount: new_stock }, req.body.item_id],
        (err, result) => {
          if (err) throw err;
          return res.send(200);
        }
      );
    }
  );
});

router.post("/removeItem", (req, res) => {
  let sql = "UPDATE merchandise SET active=false WHERE product_name=?";
  let response = {};

  db.query(sql, [req.body.product], (error, result) => {
    if (error) throw error;
    response = JSON.parse(JSON.stringify(result));
    return res.send(response);
  });
});

//Enter an item into gift shop
router.post("/additem", (req, res, next) => {
  let body = req.body;
  let item = {
    stock_amount: body.stock_amount,
    price: body.price,
    product_name: body.product_name,
    location_sold: body.location_sold,
  };

  console.log(req.body);

  let sql = "INSERT INTO merchandise SET ?";

  let response = {};
  db.query(sql, item, (error, result) => {
    if (error) throw error;
    response = JSON.parse(JSON.stringify(result));
    return res.send(response);
  });
  //   return res.send(200);
});

module.exports = router;
