const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const db = require("../database");

//Get all animals
router.post("/employee_report", (req, res, next) => {
  let default_values = {
    species: "",
    health_status: "",
    from_date: "",
    to_date: "",
  };
  let sql =
    "SELECT animals.*, species.species_name, locations.location_name FROM animals,species,locations  WHERE animals.location_id = locations.location_id AND species.species_id = animals.species_id";

  if (req.body.species) {
    sql = sql + ` AND animals.species_id = ${req.body.species}`;
  }
  if (req.body.health_status) {
    sql = sql + ` AND animals.health_status = "${req.body.health_status}"`;
  }
  if (req.body.date_from) {
    sql = sql + ` AND animals.date_arrived >= "${req.body.date_from}"`;
  }
  if (req.body.date_to) {
    sql = sql + ` AND animals.date_arrived <= "${req.body.date_to}"`;
  }
  db.query(sql, (error, result) => {
    if (error) throw error;
    all_animals = JSON.parse(JSON.stringify(result));
    // console.log(all_animals);
    return res.send(all_animals);
  });
});

router.post("/customer_report", (req, res, next) => {
  let default_values = {
    shop_name: "",
    amount_spent: "",
    customer_id: "",
    date_from: "",
    date_to: "",
  };
  let sql =
    "SELECT purchase_history.*, locations.location_name , merchandise.location_sold, merchandise.product_name FROM merchandise,purchase_history,locations  WHERE locations.location_id = merchandise.location_sold AND merchandise.item_id = purchase_history.item_purchased AND merchandise.item_id = purchase_history.item_purchased AND purchase_history.customer_id = " +
    req.body.customer_id;

  if (req.body.shop_name) {
    sql = sql + ` AND merchandise.location_sold = ${req.body.shop_name}`;
  }
  if (req.body.amount_spent) {
    sql =
      sql +
      ` AND purchase_history.total_purchase_cost >= ${req.body.amount_spent}`;
  }
  if (req.body.date_from) {
    sql =
      sql + ` AND purchase_history.purchase_time >= "${req.body.date_from}"`;
  }
  if (req.body.date_to) {
    sql = sql + ` AND purchase_history.purchase_time <= "${req.body.date_to}"`;
  }
  db.query(sql, (error, result) => {
    if (error) throw error;
    all_purchases = JSON.parse(JSON.stringify(result));
    return res.send(all_purchases);
  });
  // return res.send(404);
});

router.post("/admin_report", (req, res, next) => {
  //Gets all the items sold
  let sql =
    "SELECT purchase_history.*, locations.location_name, merchandise.product_name FROM merchandise, purchase_history,locations  WHERE locations.location_id = merchandise.location_sold AND merchandise.item_id = purchase_history.item_purchased";

  if (req.body.product_name) {
    sql =
      sql + ` AND merchandise.product_name LIKE '%${req.body.product_name}%'`;
  }
  if (req.body.shop) {
    sql = sql + ` AND merchandise.location_sold = ${req.body.shop}`;
  }
  if (req.body.amount_spent) {
    sql =
      sql +
      ` AND purchase_history.total_purchase_cost >= ${req.body.amount_spent}`;
  }
  if (req.body.from_date) {
    sql =
      sql + ` AND purchase_history.purchase_time >= "${req.body.from_date}"`;
  }
  if (req.body.to_date) {
    sql = sql + ` AND purchase_history.purchase_time <= "${req.body.to_date}"`;
  }
  db.query(sql, (error, result) => {
    if (error) throw error;
    all_purchases = JSON.parse(JSON.stringify(result));

    return res.send({ purchase_history: all_purchases });
  });
  // return res.send(404);
});

module.exports = router;
