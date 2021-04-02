const { AirlineSeatReclineNormal } = require("@material-ui/icons");
const express = require("express");
const router = express.Router();
const db = require("../database");

//Enter a merchandise into zoo
router.post("/", (req, res, next) => {
  let body = req.body;
  let animal = {
    species_id: body.species,
    date_arrived: body.date_arrived,
    deceased_date: body.deceased_date,
    birth_day: body.birth_day,
    location_id: body.location,
    animal_name: body.animal_name,
  };

  console.log(req.body);

  let sql = "INSERT INTO animals SET ?";

  let response = {};
  db.query(sql, animal, (error, result) => {
    if (error) throw error;
    response = JSON.parse(JSON.stringify(result));
    return res.send(response);
  });
  //   return res.send(200);
});

//Get All animals.
router.get("/all", (req, res, next) => {
  let sql = "SELECT * FROM animals";
  db.query(sql, (error, result) => {
    if (error) throw error;
    response = JSON.parse(JSON.stringify(result));
    return res.send(response);
  });
});

//Get Animals based on enclosure.
router.get("/list_by_enclosure", (req, res, next) => {
  let location_id = parseInt(req.query.location);

  let sql =
    "SELECT animals.*, species.species_name   FROM animals  JOIN species on animals.species_id = species.species_id  WHERE animals.location_id = ? and animals.health_status != 'Deceased' ";
  db.query(sql, [location_id], (error, result) => {
    if (error) throw error;
    response = JSON.parse(JSON.stringify(result));
    return res.send(response);
  });
  //   return res.send(200);
});

module.exports = router;
