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

module.exports = router;
