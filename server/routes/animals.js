const { AirlineSeatReclineNormal } = require("@material-ui/icons");
const express = require("express");
const router = express.Router();
const db = require("../database");

//Enter an animal into zoo
router.post("/", (req, res, next) => {
  let body = req.body;
  let animal = {
    species_id: body.species,
    date_arrived: body.date_arrived,
    deceased_date: body.deceased_date,
    birth_day: body.birth_day,
    location: body.location,
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

module.exports = router;
