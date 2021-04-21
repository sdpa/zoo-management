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

//Create new species
router.post("/create", (req, res, next) => {
  db.query(
    `SELECT * FROM species WHERE species_name LIKE "${req.body.species_name}"`,
    (err, results) => {
      if (err) throw err;
      rows = JSON.parse(JSON.stringify(results));
      if (rows.length > 0) {
        return res.status(400).json({ error: "Already Exists" });
      } else {
        let new_species = {
          species_name: req.body.species_name,
        };
        db.query("INSERT INTO species SET ? ", new_species, (err, results) => {
          if (err) throw err;
          return res.send(200);
        });
      }
    }
  );
});

module.exports = router;
